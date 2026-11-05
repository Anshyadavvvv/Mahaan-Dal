# महान दल · Mahan Dal

Responsive bilingual political party website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, MongoDB/Mongoose, React Hook Form and Zod.

## Design tokens

| Token | Value | Use |
|---|---|---|
| Saffron | `#F58220` | Brand and hero |
| Light saffron | `#F9A03F` | Gradient |
| Green | `#1B7F3B` | Nameplate and submit |
| Blue | `#1E88E5` | Primary actions |
| Charcoal | `#1F2937` | Body text |
| Hindi | Mukta / Noto Sans Devanagari | Hindi content |
| English | Poppins | English content |

## Structure

```text
app/                 App Router pages, metadata, API routes and global CSS
  [page]/            About, history, agenda, contact, policy, membership pages
  admin/             Protected admin dashboard
  api/               Letters, Jan Sunwai, membership and admin endpoints
components/          Shared responsive site, forms, slider, footer and FAQ section
lib/                 MongoDB, schemas, validation and translations
public/images/       Add approved president and inspiration imagery here
site.config.ts       Editable contact and party placeholders
```

## Setup

1. Install Node.js 20+ and MongoDB Atlas (or local MongoDB).
2. Copy `.env.example` to `.env.local`, set `MONGODB_URI`, `ADMIN_USER`, `ADMIN_PASSWORD`, `JWT_SECRET` (32+ random characters), and `NEXT_PUBLIC_SITE_URL`.
3. Run `npm install` then `npm run dev`.
4. Visit `/admin` and sign in with the configured admin credentials. Admin data is protected by an HTTP-only JWT cookie. Dashboard supports search, status filtering, status updates and CSV export.
5. Deploy to Vercel: import the repository, set the same environment variables in project settings, then deploy. Add the Vercel domain to MongoDB Atlas network access.

## Editable content and assets

Edit shared contact fields and visible placeholders in `site.config.ts`. Edit complete Hindi and English interface copy in `lib/translations/hi.json` and `lib/translations/en.json`. The supplied poster is not bundled; the president portrait, inspiration images, event images, and final logo should be placed in `public/images/` once approved. Until then, the UI marks them as placeholders.

## Forms and data

POST routes are `/api/letters`, `/api/jan-sunwai`, and `/api/membership`. They validate required content and Indian 10-digit mobile numbers server-side, apply a per-IP in-memory rate limit and honeypot check, and store submissions in MongoDB. Jan Sunwai accepts one image/PDF attachment up to 5 MB. For multi-instance production hosting, replace the in-memory limiter with a shared Redis/Upstash store. Configure backups and retention for personal data before production launch.
