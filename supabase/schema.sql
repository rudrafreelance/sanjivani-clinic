-- Sanjivani Clinic — Supabase schema
-- Run this in the Supabase SQL editor for your project.

-- 1. TESTIMONIALS ---------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  rating int default 5,
  message text not null,
  photo_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 2. PRODUCTS --------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. PRODUCT VIDEOS ----------------------------------------------------------
create table if not exists product_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  video_url text not null,
  thumbnail_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. PATIENT GALLERY (before/after photos) ----------------------------------
create table if not exists patient_gallery (
  id uuid primary key default gen_random_uuid(),
  caption text,
  photo_url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 5. APPOINTMENTS / SLOT BOOKINGS --------------------------------------------
-- status: pending (website request) | booked (confirmed / admin-created) | cancelled
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  condition text,
  preferred_date date,
  preferred_time text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'booked', 'cancelled')),
  created_at timestamptz default now()
);

-- Existing projects: run these alters once in the SQL editor
alter table appointments add column if not exists preferred_date date;
alter table appointments add column if not exists preferred_time text;
alter table appointments add column if not exists condition text;
alter table appointments add column if not exists message text;
alter table appointments add column if not exists status text;
update appointments set status = 'pending' where status is null;
alter table appointments alter column status set default 'pending';
alter table appointments alter column status set not null;

-- One active booking per date + time slot
create unique index if not exists appointments_active_slot_uidx
  on appointments (preferred_date, preferred_time)
  where status in ('pending', 'booked')
    and preferred_date is not null
    and preferred_time is not null;

-- Public can check which times are taken for a date (no patient PII returned)
create or replace function public.get_booked_times(p_date date)
returns setof text
language sql
security definer
set search_path = public
as $$
  select preferred_time
  from appointments
  where preferred_date = p_date
    and preferred_time is not null
    and status in ('pending', 'booked');
$$;

grant execute on function public.get_booked_times(date) to anon, authenticated;

-- 6. CONTACT MESSAGES ---------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- ROW LEVEL SECURITY ---------------------------------------------------------
alter table testimonials enable row level security;
alter table products enable row level security;
alter table product_videos enable row level security;
alter table patient_gallery enable row level security;
alter table appointments enable row level security;
alter table contact_messages enable row level security;

-- Public (anon) can READ content tables
create policy "Public can read testimonials" on testimonials for select using (true);
create policy "Public can read products" on products for select using (true);
create policy "Public can read product_videos" on product_videos for select using (true);
create policy "Public can read patient_gallery" on patient_gallery for select using (true);

-- Public (anon) can INSERT into form tables only (no read/update/delete)
-- Website requests must stay as pending; only admin can create booked rows
create policy "Public can submit appointments" on appointments for insert
  with check (status = 'pending');
create policy "Public can submit contact_messages" on contact_messages for insert with check (true);

-- Authenticated admin (logged in via Supabase Auth) can do everything
create policy "Admin full access testimonials" on testimonials for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full access products" on products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full access product_videos" on product_videos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full access patient_gallery" on patient_gallery for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full access appointments" on appointments for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full access contact_messages" on contact_messages for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- NOTE: After running this, create your single admin user via
-- Supabase Dashboard -> Authentication -> Users -> Add user (email + password).
-- That's the only account that should exist — the app has no public sign-up.
