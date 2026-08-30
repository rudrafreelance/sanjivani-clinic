# Sanjivani Clinic — React + Supabase + Cloudinary

A recreation of the Sanjivani Clinic (Dr. Jignesh Singada) reference site, with a
single-admin dashboard for managing testimonials, products, product videos, and
patient gallery photos.

## Stack
- **Frontend**: React 18 + Vite + React Router + Tailwind CSS
- **Backend**: Supabase (Postgres + Auth)
- **Media storage**: Cloudinary (images & videos) — Supabase only stores URLs

## 1. Install dependencies
```bash
npm install
```

## 2. Set up Supabase
1. Create a project at https://supabase.com
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql` — this creates
   all tables and Row Level Security policies.
3. Go to **Authentication → Users → Add user** and create your single admin login
   (email + password). This is the only account — there's no public sign-up form.
4. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**.

## 3. Set up Cloudinary
1. Create a free account at https://cloudinary.com
2. Go to **Settings → Upload → Upload presets → Add upload preset**
3. Set **Signing Mode** to **Unsigned** (this lets the admin panel upload directly
   from the browser without a backend server). Give it a name.
4. Copy your **Cloud name** (shown on your Cloudinary dashboard) and the preset name.

## 4. Configure environment variables
```bash
cp .env.example .env
```
Fill in:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...
VITE_CLINIC_PHONE=+91XXXXXXXXXX
```

## 5. Run locally
```bash
npm run dev
```
- Public site: http://localhost:5173
- Admin login: http://localhost:5173/admin/login (use the Supabase user you created)

## 6. Build for production
```bash
npm run build
```
Deploy the `dist/` folder to Netlify, Vercel, or any static host.

## Project structure
```
src/
  components/       Public-facing site sections (Hero, About, Products, etc.)
  pages/
    Home.jsx         Assembles all public sections
    admin/
      AdminLogin.jsx
      AdminDashboard.jsx      Tab-based admin shell
      managers/               One CRUD manager per content type
  lib/
    supabase.js       Supabase client
    cloudinary.js      Cloudinary unsigned upload helper
  context/
    AuthContext.jsx    Wraps Supabase Auth session state
supabase/
  schema.sql           Run this once in the Supabase SQL editor
```

## Content notes
- **Testimonials, Products, Product Videos, Patient Gallery** — pulled live from
  Supabase, fully manageable from `/admin`.
- **Testimonials / Appointment / Contact / Footer sections** were not visible on the
  original reference site screenshots, so these were designed fresh to match the
  same color/typography system (warm cream background, terracotta/clay accent,
  rounded display font).
- **Order flow**: clicking "Call to Order" on a product opens a `tel:` link using
  `VITE_CLINIC_PHONE` — no cart or checkout.
- Patient gallery photos should only be uploaded with patient consent — consider
  blurring faces before uploading, as done on the reference site.
