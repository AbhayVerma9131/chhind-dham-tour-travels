# छिंद धाम TOUR TRAVELS — Antigravity Master Specification

> Complete implementation brief for building a production-oriented car rental and tour website with Google Antigravity.  
> Business name must always appear exactly as **छिंद धाम TOUR TRAVELS**. Keep **छिंद** in Devanagari.

## 1. Project Overview

**Project name:** छिंद धाम TOUR TRAVELS  
**Location:** Bhanpur, Bhopal, Madhya Pradesh, India  
**Contacts:**
- Karan Kushwaha — 9691345722
- Akash Ahirwar — 7400950207

**Primary objective:** Build a professional website for self-drive rentals, chauffeur-driven rentals, local/outstation travel, and pilgrimage tours.

### Design direction
- Premium dark theme: black/navy background with blue-purple gradient accents.
- Modern typography, rounded cards, polished transitions, and high-quality vehicle imagery.
- Mobile-first responsive design.
- Fast loading, accessible, and SEO-friendly.
- Public customer website plus a protected admin dashboard.
- Initial workflow is a booking request/enquiry. A request is **not confirmed** until an admin confirms it.

## 2. Recommended Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| UI | Accessible reusable component system |
| Animation | Motion / Framer Motion, used sparingly |
| Backend | Next.js server-side APIs and services |
| Database | PostgreSQL |
| ORM and migrations | Prisma |
| Validation | Zod |
| Authentication | Auth.js or a similarly established solution |
| Image storage | S3-compatible or managed image service |
| Email | Transactional email provider, optional |
| WhatsApp | Click-to-chat initially; official API integration later if needed |
| Testing | Vitest and Playwright |
| Version control | Git and GitHub |
| Deployment | Vercel or compatible host + managed PostgreSQL |

**Architecture:** Use a modular monolith. Do not introduce microservices unless a concrete scaling or operational need appears.

## 3. Instructions for the Antigravity Agent

Act as a senior full-stack engineer, software architect, security engineer, UI/UX designer, database engineer, and QA engineer.

1. Inspect the existing repository before modifying anything.
2. If no app exists, initialize a clean project with the selected stack.
3. First create `IMPLEMENTATION_PLAN.md`, `ARCHITECTURE.md`, and `TASKS.md`.
4. Implement in small, testable phases; do not generate everything in one unverified pass.
5. Implement working functionality, not merely static screens or fake buttons.
6. Never invent business details, prices, availability, testimonials, legal policies, or package inclusions.
7. Store editable vehicles, prices, packages, and business settings in the database.
8. Use strict TypeScript and server-side input validation.
9. Keep secrets out of source code and browser bundles.
10. Run tests, lint, type checks, and production builds; fix failures before reporting completion.
11. If a third-party account or credential is unavailable, use a safe adapter and document setup steps.
12. Never delete existing work or perform destructive database operations without explicit review.

## 4. Confirmed Business Data

### 4.1 Vehicle catalogue

Seed these vehicle names:
- Aura
- Ertiga
- Dzire
- Victoris
- Scorpio
- Scorpio-N
- Thar
- XUV 700
- Verna

Store the following fields where known: name, slug, brand, model, category, verified seating capacity, transmission, fuel type, luggage capacity, images, description, supported rental modes, active status, and featured status.

Do not guess specifications. Unknown information should be omitted or displayed as “Contact for details”. Verify seating capacity before assigning a per-kilometre rate.

### 4.2 Chauffeur-driven rates

- Verified 5-seater category: **₹11/km**
- Verified 7-seater category: **₹13/km**

These rates include a driver. Minimum kilometres, tolls, parking, interstate taxes, driver allowance, night charges, waiting charges, and other terms have not been confirmed. Make these terms configurable in admin, but do not publish unconfirmed terms as facts.

### 4.3 Self-drive rates

| Vehicle | Duration | Price |
|---|---:|---:|
| Mahindra Thar | 6 hours | ₹2,000 |
| Mahindra Thar | 12 hours | ₹3,500 |
| Mahindra Thar | 24 hours | ₹4,200 |
| XUV 700 | 24 hours | ₹5,500 |
| Scorpio-N | 24 hours | ₹5,500 |
| Scorpio | 24 hours | ₹5,000 |
| Verna | 24 hours | ₹5,000 |

For vehicles or durations without a supplied price, display **Contact for Price**. Do not invent deposits, kilometre limits, fuel policies, late-return charges, age requirements, or licence requirements. Provide editable policy fields so the business can confirm them later.

### 4.4 Tour package seed data

| Package / route | Supplied price | Notes |
|---|---:|---|
| Bhopal to Maihar | ₹13,000 | Supplied as an Ertiga rate; confirm exact inclusions and terms |
| Bhopal to Bagalamukhi Dham | ₹5,100 | Supplied as an Ertiga rate; confirm exact inclusions and terms |
| Shubh Navratri special offer | ₹2,750 | Destination and conditions need confirmation |

Do not invent duration, itinerary, inclusions, exclusions, return-trip details, toll/parking terms, or promotional validity. Flag unverified details for admin review before publishing.

## 5. Public Pages and Routes

Create these pages:
1. `/` — Home
2. `/cars` — Vehicle catalogue
3. `/cars/[slug]` — Vehicle details
4. `/self-drive` — Self-drive rentals and prices
5. `/with-driver` — Chauffeur-driven rentals
6. `/tour-packages` — Tour and pilgrimage packages
7. `/tour-packages/[slug]` — Package details
8. `/booking` — Booking/enquiry form
9. `/about` — About the business
10. `/contact` — Contact information and location
11. `/privacy-policy` — Privacy policy
12. `/terms` — Terms and conditions
13. `/cancellation-policy` — Cancellation policy, once business rules are confirmed
14. Custom not-found and error pages

### Homepage sections
1. Responsive navbar with logo, navigation, contact CTA, and booking CTA.
2. Hero section with a premium vehicle image, clear headline, and booking action.
3. Quick booking enquiry form.
4. Featured vehicles.
5. Self-drive rental offers.
6. Chauffeur-driven rates.
7. Tour and pilgrimage packages.
8. Why choose us — only factual, confirmed claims.
9. Booking process.
10. Contact/WhatsApp CTA.
11. Footer with contacts, location, navigation, and legal links.

### UI/UX requirements
- Premium dark theme with accessible contrast.
- Blue-purple accents; avoid excessive glow and animation.
- Responsive mobile navigation and keyboard accessibility.
- Vehicle cards must show only confirmed specifications and applicable rates.
- Every data-driven page needs loading, empty, error, and success states.
- Forms need labels, validation feedback, submission states, and clear confirmation messages.
- Optimize images, lazy-load below-the-fold content, and use fallbacks.
- Respect reduced-motion preferences.
- No fake reviews, fabricated ratings, dead links, or nonfunctional controls.

## 6. Backend and API Requirements

Create independent modules for:
- `vehicles` — vehicle catalogue and specifications.
- `pricing` — chauffeur and self-drive pricing rules.
- `tour-packages` — package data, prices, and publication status.
- `bookings` — booking requests and lifecycle.
- `enquiries` — general contact enquiries.
- `availability` — availability information if maintained by admin.
- `notifications` — email/WhatsApp provider adapters.
- `admin` — privileged administrative operations.
- `audit` — sensitive admin change history.

Suggested API routes (adapt to framework conventions):
- `GET /api/v1/vehicles`
- `GET /api/v1/vehicles/[slug]`
- `GET /api/v1/pricing`
- `GET /api/v1/tour-packages`
- `POST /api/v1/bookings`
- `POST /api/v1/contact`
- `GET /api/v1/admin/bookings`
- `PATCH /api/v1/admin/bookings/[id]`
- `POST /api/v1/admin/vehicles`
- `PATCH /api/v1/admin/vehicles/[id]`
- `POST /api/v1/admin/tour-packages`
- `PATCH /api/v1/admin/pricing/[id]`

Every endpoint must have appropriate server-side validation, authorization, predictable errors, logging, and rate limiting where relevant. Public users must never be able to perform privileged admin operations.

### Booking workflow
1. Customer chooses rental mode.
2. Customer chooses a vehicle or package.
3. Customer provides pickup location, destination where relevant, dates/times, and contact details.
4. Server validates the request.
5. Request is saved with status `PENDING`.
6. Customer receives an enquiry reference and acknowledgement.
7. Admin checks availability and details.
8. Admin confirms, rejects, or requests more information.
9. Customer is notified if a notification provider is configured.

Submitting a form is **not** a confirmed booking. Do not promise availability unless a real availability system verifies it.

## 7. Database Design

Use PostgreSQL with Prisma migrations and seed scripts.

Recommended models:

| Model | Purpose |
|---|---|
| `AdminUser` | Admin identity and role |
| `Vehicle` | Vehicle catalogue and specifications |
| `VehicleImage` | Vehicle images and ordering |
| `RentalRate` | Time-based and per-kilometre rates |
| `TourPackage` | Package description, price, and publication |
| `BookingRequest` | Customer booking requests |
| `ContactEnquiry` | General enquiries |
| `BusinessSetting` | Editable business contact/display settings |
| `Promotion` | Special offers with start/end dates |
| `BookingStatusHistory` | Booking status changes |
| `AuditLog` | Sensitive administrative changes |

### Database rules
- Use UUIDs or equivalent stable primary keys.
- Use decimal-safe money fields, not floating-point calculations.
- Store prices in INR and define rounding rules.
- Store timestamps consistently and display them in `Asia/Kolkata`.
- Add constraints, foreign keys, indexes, and sensible deletion rules.
- Version-control migrations.
- Make seed data deterministic and use no real customer personal data.
- Avoid collecting identity documents unless a confirmed business need and secure handling process exist.
- Separate staging and production databases.

### Booking statuses
`PENDING`, `CONTACTED`, `CONFIRMED`, `REJECTED`, `CANCELLED`, `COMPLETED`.

Validate allowed status transitions and record each transition. Do not allow arbitrary status changes without a documented admin correction flow.

## 8. Admin Dashboard

Build a protected `/admin` area.

Features:
- Overview of new and pending enquiries.
- Booking requests filtered by status, date, and rental type.
- Search by booking reference or customer contact.
- View enquiry details and update status.
- Add, edit, archive, and feature vehicles.
- Upload and reorder vehicle images.
- Manage chauffeur and self-drive pricing.
- Create, edit, publish, and unpublish tour packages.
- Configure offers and expiry dates.
- Update business contact information and confirmed policies.
- View audit logs.
- Export booking records to CSV with access controls.

Use server-enforced authorization for every privileged action. Hiding admin buttons in the frontend is not sufficient. Add roles only as needed, and default to least privilege.

## 9. Security Requirements

Treat all of the following as mandatory:
1. Use an established authentication library for admin login.
2. Hash passwords with a proven password-hashing implementation; never store plaintext passwords.
3. Enforce server-side roles and permissions on every protected operation.
4. Validate every public and admin input with Zod or an equivalent schema.
5. Rate-limit login, booking, and contact endpoints.
6. Add spam and bot mitigation.
7. Configure secure cookies and session management.
8. Add CSRF protection where relevant to the selected auth/request architecture.
9. Use Prisma's parameterized database access; avoid unsafe raw SQL.
10. Configure restrictive CORS if separate origins are used.
11. Use HTTPS and suitable security headers/CSP in production.
12. Prevent XSS through safe rendering and sanitization where needed.
13. Keep database URLs, API keys, and provider secrets in environment variables.
14. Never expose secrets through `NEXT_PUBLIC_*` variables.
15. Do not log passwords, tokens, or unnecessary personal information.
16. Audit sensitive admin changes.
17. Configure backups and test restoration.
18. Run dependency and vulnerability checks.
19. Do not expose stack traces or internal errors to production users.
20. Document privacy-conscious retention, deletion, and incident response.

Use least-privilege database credentials. Document how to rotate secrets and respond to a security incident.

## 10. Image Uploads and Storage

- Use managed image storage or private object storage.
- Restrict uploads to authorized admins.
- Validate actual file type/content and enforce size limits.
- Generate safe filenames; never trust user-supplied paths.
- Prevent executable uploads.
- Optimize images and generate responsive sizes.
- Store image URLs and metadata in the database, not binary blobs in vehicle rows.
- Use placeholders until genuine vehicle images are supplied.

## 11. Notifications and Integrations

Use provider adapters so integrations can change without rewriting business logic:
- WhatsApp click-to-chat initially.
- Optional transactional email acknowledgement.
- Optional admin notification on new booking requests.
- Optional WhatsApp Business API later.
- Optional map integration for the business location.

Do not claim a message was sent when no provider is configured. Never put private provider credentials in frontend code.

## 12. SEO, Performance, and Accessibility

### SEO
- Unique titles and meta descriptions for each route.
- Canonical URLs.
- Sitemap and robots configuration.
- Clean vehicle/package URLs.
- Open Graph metadata.
- Accurate structured data only where appropriate.
- Local SEO content for Bhopal and actual service areas.
- Descriptive alt text.
- No fake reviews or unsupported claims.

### Performance
- Resize and optimize images.
- Use server rendering/static rendering where appropriate.
- Minimize unnecessary client-side JavaScript.
- Index database columns based on actual query patterns.
- Cache public catalogue data carefully.
- Never publicly cache private booking or admin data.

### Accessibility
- Semantic HTML.
- Keyboard-accessible navigation, dialogs, and forms.
- Visible focus states.
- Labels and actionable validation messages.
- Adequate color contrast.
- Reduced-motion support.
- Screen-reader-friendly status messages.

## 13. Testing and QA

Implement:
- Unit tests for pricing calculations, durations, and validators.
- Tests for missing or unknown rates.
- Tests for date/time validation.
- Tests for invalid booking status transitions.
- Integration tests for database-backed services.
- Tests proving unauthenticated users cannot access admin operations.
- Tests for rate limiting and malformed input.
- CRUD tests for vehicles, prices, and packages.
- Migration and seed checks.
- Playwright end-to-end tests for key pages and booking submission.
- Responsive and accessibility checks for core flows.

Use fake test data only. Never use real customer data in automated tests.

Before declaring completion, run:
- Lint
- Type checking
- Unit/integration tests
- End-to-end tests where configured
- Production build

Fix failures or document any external dependency that prevents a check from running.

## 14. Deployment and Operations

Prepare:
- Production build scripts.
- Separate development, staging, and production configurations.
- Managed PostgreSQL with SSL.
- Environment-variable documentation.
- GitHub CI checks for pull requests.
- Safe migration instructions.
- Backup and restore instructions.
- Error monitoring and structured application logs.
- Health checks where supported.
- Rollback instructions.
- Custom domain and HTTPS setup.

Do not apply destructive production migrations without review and a backup.

## 15. Required Files

Create and maintain:
- `README.md` — setup, commands, and project overview.
- `IMPLEMENTATION_PLAN.md` — phases and sequence.
- `ARCHITECTURE.md` — system architecture.
- `TASKS.md` — completed, in-progress, and pending tasks.
- `SECURITY.md` — security controls and reporting.
- `.env.example` — variable names with placeholder values only.
- `prisma/schema.prisma` — schema.
- `prisma/migrations/` — migrations.
- `prisma/seed.ts` — development seed data.
- Unit, integration, and E2E test directories.
- Deployment documentation.
- `docs/business-policies.md` — unconfirmed terms requiring business approval.

Never commit `.env`, credentials, private keys, production data, or backups containing personal information.

## 16. Suggested Folder Structure

```text
chhind-dham-tour-travels/
├── public/
│   ├── branding/
│   ├── images/
│   │   ├── cars/
│   │   ├── packages/
│   │   └── general/
│   ├── icons/
│   └── fonts/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── cars/
│   │   │   ├── self-drive/
│   │   │   ├── with-driver/
│   │   │   ├── tour-packages/
│   │   │   ├── booking/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── privacy-policy/
│   │   │   └── terms/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── vehicles/
│   │   │   ├── pricing/
│   │   │   ├── packages/
│   │   │   └── bookings/
│   │   ├── api/
│   │   │   └── v1/
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── vehicles/
│   │   ├── packages/
│   │   └── booking/
│   ├── features/
│   │   ├── vehicles/
│   │   ├── pricing/
│   │   ├── bookings/
│   │   ├── packages/
│   │   └── enquiries/
│   ├── server/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── policies/
│   │   └── notifications/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── env.ts
│   │   ├── rate-limit.ts
│   │   ├── logger.ts
│   │   └── utils.ts
│   ├── types/
│   └── middleware.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── deployment.md
│   ├── database.md
│   ├── security.md
│   └── business-policies.md
├── .github/
│   └── workflows/
├── .env.example
├── .gitignore
├── README.md
├── ARCHITECTURE.md
├── IMPLEMENTATION_PLAN.md
├── TASKS.md
├── SECURITY.md
├── package.json
└── tsconfig.json
```

This is the target structure. Create folders/files when they are needed rather than generating empty placeholders for every item.

## 17. Phased Implementation Plan

### Phase 1 — Planning and requirements
- Inspect the repository.
- Create architecture, tasks, and assumptions documents.
- List missing business policies and required credentials.
- Confirm stack and folder layout.

### Phase 2 — Foundation
- Initialize the application.
- Configure TypeScript, Tailwind, linting, and tests.
- Add environment validation.
- Set up PostgreSQL and Prisma migrations.

### Phase 3 — Database and backend
- Create models and seed data.
- Implement vehicle, pricing, package, and enquiry services.
- Add validation, error handling, and rate limiting.
- Add automated tests.

### Phase 4 — Frontend
- Build design system and responsive navigation.
- Implement homepage and catalogue pages.
- Add pricing and tour-package views.
- Build booking and contact forms.

### Phase 5 — Authentication and admin
- Secure admin login.
- Implement server-side authorization.
- Add vehicle, pricing, package, and booking management.
- Add audit logs.

### Phase 6 — Integration
- Connect pages to database data.
- Add optional notification adapters.
- Add customer acknowledgements and booking references.

### Phase 7 — QA and hardening
- Test critical flows and unauthorized access.
- Fix mobile, accessibility, and build issues.
- Verify all displayed prices against approved data.

### Phase 8 — Production
- Configure hosting and managed database.
- Apply migrations safely.
- Configure domain, HTTPS, environment variables, and backups.
- Run smoke tests and document handover.

## 18. Definition of Done

The project is not complete until:
- The brand consistently displays as **छिंद धाम TOUR TRAVELS**.
- All nine vehicles are represented correctly.
- Supplied prices are accurate and unknown prices show “Contact for Price”.
- Driver rates are applied only to verified seating categories.
- Booking enquiries persist in PostgreSQL.
- Requests are not marked confirmed before admin approval.
- Admin pages and APIs enforce authorization.
- Prices and packages are editable without code changes.
- Validation, rate limiting, and secure environment handling are implemented.
- Automated tests and production build pass.
- Core pages work on mobile and desktop.
- Accessibility and SEO checks are completed.
- Deployment, migration, backup, and restore instructions exist.
- Unconfirmed policies and package details are flagged for business approval.


