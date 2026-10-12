# छिंद धाम TOUR TRAVELS — Production Web Platform

> Official web portal and reservation management platform for **छिंद धाम TOUR TRAVELS**, Bhanpur, Bhopal, Madhya Pradesh, India.

---

## 1. Project Overview

- **Business Name:** छिंद धाम TOUR TRAVELS (*"छिंद"* in Devanagari)
- **Location:** Bhanpur, Bhopal, Madhya Pradesh, India
- **Key Contacts:**
  - **Karan Kushwaha** — 9691345722 (Owner & Operations)
  - **Akash Ahirwar** — 7400950207 (Co-founder & Fleet)
- **Services Offered:**
  - Self-Drive Car Rentals (Mahindra Thar, XUV 700, Scorpio-N, Scorpio Classic, Hyundai Verna)
  - Chauffeur-Driven Rentals (Verified 5-seater ₹11/km and 7-seater ₹13/km tariffs)
  - Pilgrimage Tour Packages (Bhopal to Maihar, Bhopal to Bagalamukhi Dham, Navratri specials)

---

## 2. Technology Stack

- **Framework:** Next.js 14+ (App Router, Server Components & Route Handlers)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Vanilla Tailwind CSS with custom dark palette (`#080b12` background, blue-purple gradient accents)
- **Database & ORM:** PostgreSQL with Prisma ORM
- **Validation:** Zod (runtime input and environment schemas)
- **Authentication:** HMAC-SHA256 session tokens with HttpOnly cookies & bcrypt password hashing
- **Testing:** Vitest with jsdom and React Testing Library
- **SEO & Meta:** Dynamic `robots.txt`, `sitemap.xml`, and JSON-LD `LocalBusiness` / `AutoRental` Schema

---

## 3. Quick Start (Development)

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation
```bash
# Clone the repository
git clone <REPO_URL>
cd chhind-dham-tour-travels

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Create local environment configuration
cp .env.example .env
```

### Running Tests & Lint
```bash
# Run unit & integration tests (Vitest)
npm test

# Run TypeScript compilation check
npm run typecheck

# Run Next.js linter
npm run lint
```

### Starting Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```

---

## 4. Route Structure

### Public Pages
- `/` — Homepage (Hero, Quick Enquiry, Fleet Showcase, Rates, Pilgrimage, Process, Direct CTAs)
- `/cars` — Complete 9-vehicle catalogue
- `/cars/[slug]` — Detailed vehicle specifications and rental tariff breakdown
- `/self-drive` — Self-drive duration slabs and operational guidelines
- `/with-driver` — Chauffeur ₹11/km and ₹13/km category guidelines
- `/tour-packages` — Sacred pilgrimage routes and packages
- `/tour-packages/[slug]` — Tour package details and booking action
- `/booking` — Interactive trip enquiry and reservation form
- `/track` — Live customer enquiry tracking by reference number (`CDT-YYYYMMDD-XXXX`)
- `/about` — Authentic background of छिंद धाम TOUR TRAVELS in Bhopal
- `/contact` — Direct phone numbers, WhatsApp links, and enquiry message form
- `/terms` — Terms and conditions
- `/privacy-policy` — Privacy and customer data protection policy
- `/cancellation-policy` — Cancellation & rescheduling policy

### Admin Portal
- `/admin/login` — Authenticated portal login
- `/admin/dashboard` — Live metrics (Total, Pending, Contacted, Confirmed)
- `/admin/bookings` — Booking management, status transitions, search, and CSV export
- `/admin/vehicles` — Fleet inventory management
- `/admin/pricing` — Tariff management
- `/admin/packages` — Tour package management
- `/admin/audit` — Immutable administrative audit log

---

## 5. Security & Business Verification Notes

1. **No Fabricated Data:** Every displayed rate reflects confirmed business data. All unpriced combinations safely fall back to **"Contact for Price"**.
2. **Booking Pipeline:** Form submissions enter with status **PENDING**. Requests are never represented to the user as confirmed until verified and moved through explicit administrative workflow transitions.
3. **Protected Admin Area:** All administrative operations enforce server-side authentication and role authorization.
4. **Rate Limiting:** Public submission endpoints are protected against automated request abuse.

---

## 6. Handover Documentation
- Detailed deployment instructions: [docs/deployment.md](file:///c:/Users/HP/Documents/chhind-dham-tour-travels/docs/deployment.md)
- Database migration & backup runbook: [docs/database.md](file:///c:/Users/HP/Documents/chhind-dham-tour-travels/docs/database.md)
- Confirmed business data log: [docs/business-policies.md](file:///c:/Users/HP/Documents/chhind-dham-tour-travels/docs/business-policies.md)
- Security policy: [SECURITY.md](file:///c:/Users/HP/Documents/chhind-dham-tour-travels/SECURITY.md)
