# mokap

A generic company website with a local admin panel. All brand details are placeholders ("Acme Industrial") and live in `src/config/site.ts`; page copy is in `src/i18n/ui.ts`.

- **Stack:** Astro 7 + `@astrojs/node` (standalone), built-in `node:sqlite` (Node 22.12+), scrypt-hashed passwords, cookie sessions.
- **Public site:** English + Indonesian. Articles, Products, Services and Certificates are read from SQLite; the contact form saves to the DB.
- **Admin:** `/admin` — login `admin` / `admin123` (mockup default). Full CRUD for Articles, Products, Services, Certificates; inbox for contact messages.
- **Images:** cover images, product photos and certificate scans are uploaded in the admin (PNG/JPG/WebP/GIF, max 5 MB) and stored in `data/uploads/`.
- **Database:** `data/app.db`, created and seeded from `src/data/*.ts` on first run. Delete it to reset.

```sh
npm install
npm run dev      # http://localhost:4321  (admin: /admin)
npm run build && node dist/server/entry.mjs
```

Not for production as-is: default credentials, no CSRF tokens, no rate limiting, nested fields edited as JSON. Needs a Node host.
