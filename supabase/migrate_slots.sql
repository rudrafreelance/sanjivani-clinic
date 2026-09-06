-- Run this once in Supabase → SQL Editor → Run
-- Fixes missing appointment columns + slot booking support.

-- Date / time preference columns (needed by the website form)
alter table appointments add column if not exists preferred_date date;
alter table appointments add column if not exists preferred_time text;
alter table appointments add column if not exists condition text;
alter table appointments add column if not exists message text;
-- Booking status: pending | booked | cancelled
alter table appointments add column if not exists status text;
update appointments set status = 'pending' where status is null;
alter table appointments alter column status set default 'pending';
alter table appointments alter column status set not null;

do $$ begin
  alter table appointments
    add constraint appointments_status_check
    check (status in ('pending', 'booked', 'cancelled'));
exception when duplicate_object then null;
end $$;

-- One active booking per date + time slot
create unique index if not exists appointments_active_slot_uidx
  on appointments (preferred_date, preferred_time)
  where status in ('pending', 'booked')
    and preferred_date is not null
    and preferred_time is not null;

-- Public can check which times are taken (no patient PII)
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

-- Website may only insert pending requests
drop policy if exists "Public can submit appointments" on appointments;
create policy "Public can submit appointments" on appointments for insert
  with check (status = 'pending');

-- Refresh PostgREST schema cache so new columns are visible immediately
notify pgrst, 'reload schema';
