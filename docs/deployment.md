# Deployment Runbook — छिंद धाम TOUR TRAVELS

## 1. Hosting Architecture Overview
The application is built on **Next.js (App Router)** and is optimized for deployment on modern platforms such as **Vercel**, **Railway**, **Render**, or a standalone **Ubuntu Linux VM (Node.js/Docker)** paired with a managed **PostgreSQL** instance (e.g., Supabase, Neon, AWS RDS, or Aiven).

---

## 2. Environment Variables Checklist
Configure the following environment variables in your hosting provider's dashboard:

| Variable | Description | Example / Recommended Value |
|---|---|---|
| `NODE_ENV` | Environment mode | `production` |
| `NEXT_PUBLIC_APP_URL` | Canonical public URL | `https://chhinddhamtravels.com` |
| `NEXT_PUBLIC_SITE_NAME` | Business brand title | `छिंद धाम TOUR TRAVELS` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/chhind_dham_travels?sslmode=require&pgbouncer=true` |
| `AUTH_SECRET` | 32+ byte cryptographically random key | Generate via `openssl rand -base64 32` |
| `ADMIN_DEFAULT_PASSWORD` | Initial admin seed password | Strong password (e.g., `ChhindDham#2026@ProdSecure`) |
| `CONTACT_PHONE_1` | Primary phone & WhatsApp | `9691345722` |
| `CONTACT_NAME_1` | Primary contact name | `Karan Kushwaha` |
| `CONTACT_PHONE_2` | Secondary phone | `7400950207` |
| `CONTACT_NAME_2` | Secondary contact name | `Akash Ahirwar` |
| `CONTACT_LOCATION` | Physical business address | `Bhanpur, Bhopal, Madhya Pradesh, India` |

---

## 3. Deployment Steps

### Option A: Vercel (Recommended for Next.js)
1. Import repository into Vercel.
2. Select framework preset: **Next.js**.
3. Add the environment variables listed above.
4. Set Build Command: `prisma generate && next build`.
5. Set Install Command: `npm install`.
6. Attach custom domain `chhinddhamtravels.com` with automatic Let's Encrypt SSL certificate.

### Option B: Standalone Node.js / Docker
1. Build the production bundle:
   ```bash
   npm install --production=false
   npx prisma generate
   npm run build
   ```
2. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Start the application with process manager (e.g., PM2):
   ```bash
   pm2 start npm --name "chhind-dham-web" -- start
   ```

---

## 4. Health Checks & Verification
After deployment, verify the following endpoints:
- `GET /` — Homepage loads with dark theme and brand name **छिंद धाम TOUR TRAVELS**.
- `GET /robots.txt` — Returns public crawler rules and sitemap link.
- `GET /sitemap.xml` — Returns XML sitemap.
- `GET /admin/login` — Loads secure admin login screen.
- `POST /api/v1/bookings` — Submits a test enquiry; returns reference number `CDT-YYYYMMDD-XXXX`.

---

## 5. Rollback Procedures
- **Vercel**: Navigate to **Deployments** > Select previous stable deployment > Click **Instant Rollback**.
- **PM2 / VM**: Roll back Git commit, run `npm run build`, and `pm2 restart chhind-dham-web`.
