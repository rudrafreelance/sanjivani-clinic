-- Run once in Supabase SQL Editor
alter table testimonials add column if not exists posted_ago text;
notify pgrst, 'reload schema';
