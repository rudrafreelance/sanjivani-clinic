-- Run once in Supabase SQL Editor (fixes products ↔ product_images relationship)

-- 1) Create table
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null,
  image_url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 2) Ensure FK exists (required for PostgREST nested select)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'product_images_product_id_fkey'
  ) then
    alter table product_images
      add constraint product_images_product_id_fkey
      foreign key (product_id)
      references products(id)
      on delete cascade;
  end if;
end $$;

create index if not exists product_images_product_id_idx on product_images(product_id);

-- 3) RLS
alter table product_images enable row level security;

drop policy if exists "Public can read product_images" on product_images;
create policy "Public can read product_images" on product_images
  for select using (true);

drop policy if exists "Admin full access product_images" on product_images;
create policy "Admin full access product_images" on product_images
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 4) Optional backup column on products
alter table products add column if not exists images_json text default '[]';

-- 5) Seed from image_url when product has no gallery rows
insert into product_images (product_id, image_url, sort_order)
select p.id, p.image_url, 0
from products p
where p.image_url is not null
  and p.image_url <> ''
  and not exists (
    select 1 from product_images pi where pi.product_id = p.id
  );

-- 6) Seed from images_json
do $$
declare
  r record;
  url text;
  idx int;
  arr jsonb;
begin
  for r in
    select id, images_json
    from products
    where images_json is not null
      and images_json <> ''
      and images_json <> '[]'
  loop
    begin
      arr := r.images_json::jsonb;
    exception when others then
      continue;
    end;

    if jsonb_typeof(arr) <> 'array' then
      continue;
    end if;

    idx := 0;
    for url in select jsonb_array_elements_text(arr)
    loop
      if url is not null and url <> '' then
        insert into product_images (product_id, image_url, sort_order)
        select r.id, url, idx
        where not exists (
          select 1 from product_images pi
          where pi.product_id = r.id and pi.image_url = url
        );
        idx := idx + 1;
      end if;
    end loop;
  end loop;
end $$;

-- 7) Reload PostgREST schema cache (critical)
notify pgrst, 'reload schema';
