# IMPLEMENTATION PLAN — छिंद धाम TOUR TRAVELS

## Overview
This document defines the structured, multi-phase plan for building the production-oriented website and management platform for **छिंद धाम TOUR TRAVELS** (Bhanpur, Bhopal, Madhya Pradesh).

The implementation strictly adheres to the guidelines in `ANTIGRAVITY_MASTER_SPEC.md`:
- Never invent unconfirmed policies, prices, vehicle attributes, availability, or testimonials.
- Enforce secure-by-default architecture, server-side data validation, and authorization.
- Progress iteratively in distinct phases, verifying each milestone with tests and builds before proceeding.

---

## Phase Breakdown

### Phase 1: Planning and Requirements (Current)
- [x] Inspect existing workspace.
- [x] Create comprehensive architecture document (`ARCHITECTURE.md`).
- [x] Create implementation tracking document (`TASKS.md`).
- [x] Create business assumptions and unconfirmed policy tracker (`docs/business-policies.md`).
- [x] Establish security policy and baseline (`SECURITY.md`).

### Phase 2: Foundation & Project Scaffolding
- [ ] Initialize Next.js 14+ (App Router, TypeScript, Tailwind CSS, ESLint).
- [ ] Configure strict TypeScript (`tsconfig.json`) and project directory structure matching Section 16 of the spec.
- [ ] Configure environment schema validation using Zod (`src/lib/env.ts` and `.env.example`).
- [ ] Set up Prisma ORM (`prisma/schema.prisma`) configured for PostgreSQL with connection pooling support.
- [ ] Install and configure testing framework: Vitest for unit/integration tests with `@testing-library/react`.
- [ ] Set up baseline scripts in `package.json` (`dev`, `build`, `test`, `lint`, `typecheck`, `prisma:generate`).
- [ ] Implement foundational utility libraries (`cn`, logging, rate-limiting interface).
- [ ] Verify test runner, linter, and build pipeline run cleanly.

### Phase 3: Database Models, Seed Data & Backend Core Services
- [ ] Define full Prisma schema models:
  - `AdminUser` (with role, hashed password, salt/bcrypt)
  - `Vehicle` & `VehicleImage` (status, seat count, transmission, fuel, etc.)
  - `RentalRate` (mode: CHAUFFEUR / SELF_DRIVE, durationHours, price, ratePerKm, seatCategory)
  - `TourPackage` (slug, title, pricing, route, publication state)
  - `BookingRequest` & `BookingStatusHistory` (transitions, customer details, enquiry ref)
  - `ContactEnquiry`
  - `BusinessSetting` (contact numbers, address, business hours, configurable policies)
  - `AuditLog`
- [ ] Create deterministic database seed script (`prisma/seed.ts`):
  - 9 seed vehicles (Aura, Ertiga, Dzire, Victoris, Scorpio, Scorpio-N, Thar, XUV 700, Verna).
  - Verified 5-seater (₹11/km) and 7-seater (₹13/km) chauffeur rates.
  - Verified Thar (6h, 12h, 24h), XUV 700, Scorpio-N, Scorpio, Verna self-drive rates.
  - Tour packages (Bhopal to Maihar ₹13,000; Bhopal to Bagalamukhi Dham ₹5,100; Shubh Navratri special ₹2,750 flagged with unverified details notes).
  - Verified contacts: Karan Kushwaha (9691345722), Akash Ahirwar (7400950207), Bhanpur, Bhopal.
- [ ] Implement backend repositories and services:
  - Vehicles service (queries, slug lookup, filtering)
  - Pricing service (calculators, rule resolution, unknown rate fallbacks)
  - Tour package service
  - Booking enquiry service with unique human-readable enquiry reference generation (e.g., `CDT-YYYYMMDD-XXXX`)
  - Booking state machine transition validator (`PENDING` -> `CONTACTED` -> `CONFIRMED`/`REJECTED`/`CANCELLED` -> `COMPLETED`)
- [ ] Add unit tests for pricing calculations, state transitions, and validation schemas.

### Phase 4: Public Frontend & Design System
- [ ] Create accessible, high-contrast dark theme design system in Tailwind:
  - Deep dark background (`#0b0f19` / `#05070c`), rich slate cards, vibrant royal blue & purple gradient accents (`#3b82f6` -> `#8b5cf6`).
  - Typography: clean sans-serif (Inter / Outfit).
  - Micro-interactions, accessible focus rings, reduced-motion consideration.
- [ ] Core layout components:
  - Responsive Navbar with **छिंद धाम TOUR TRAVELS** brand logo, mobile drawer, quick call/WhatsApp buttons.
  - Responsive Footer with contacts (Karan Kushwaha, Akash Ahirwar), location (Bhanpur, Bhopal), legal links.
  - Reusable UI elements: `Button`, `Card`, `Badge`, `Input`, `Select`, `Dialog`, `Alert`.
- [ ] Public routes:
  - `/` (Home): Hero, quick enquiry form, featured fleet, self-drive pricing grid, chauffeur rates, pilgrimage tours, factual "Why Choose Us", booking process, direct WhatsApp CTA.
  - `/cars`: Vehicle catalogue with filters (rental mode, seating capacity, transmission).
  - `/cars/[slug]`: Rich vehicle specification sheet (only displaying confirmed specs, graceful "Contact for details" fallback).
  - `/self-drive`: Self-drive price tables, terms placeholders flagged as business configurable.
  - `/with-driver`: Chauffeur per-km breakdown by seating capacity (5-seater ₹11/km, 7-seater ₹13/km).
  - `/tour-packages` & `/tour-packages/[slug]`: Pilgrimage packages.
  - `/booking`: Complete multi-step / interactive booking request form with live summary.
  - `/about`: Authentic business background and fleet introduction.
  - `/contact`: Direct phone links, WhatsApp click-to-chat, Bhopal address, general enquiry form.
  - `/terms`, `/privacy-policy`, `/cancellation-policy`: Transparent, compliant legal terms.
  - Custom `not-found.tsx` and `error.tsx`.

### Phase 5: Authentication & Admin Dashboard
- [ ] Secure admin authentication (JWT session or session cookie with bcrypt password verification).
- [ ] Server-enforced role and permission middleware (`/admin/*` and `/api/v1/admin/*`).
- [ ] Admin Portal:
  - Dashboard metrics: new enquiries, pending reviews, recent audit events.
  - Booking enquiry management: status updater with audit history and customer notes.
  - Vehicle management: create, update, toggle active/featured, configure specs.
  - Pricing management: edit self-drive duration prices and chauffeur per-km rates.
  - Tour package manager: publish/unpublish, edit package details.
  - Business settings & policy editor.
  - Audit log viewer.
  - Export bookings to CSV.

### Phase 6: Integration & Notifications
- [ ] Wire public frontend pages to API routes & server components.
- [ ] Notification provider interface (`NotificationAdapter`):
  - WhatsApp click-to-chat URL generator.
  - Transactional email adapter (mock/console for local dev, pluggable SMTP/Resend for prod).
  - Internal enquiry notification trigger.
- [ ] Client enquiry tracking / acknowledgement page with reference ID lookup.

### Phase 7: QA, Security Hardening & Polish
- [ ] Rate limiting on API routes (`/api/v1/bookings`, `/api/v1/contact`, `/api/v1/admin/login`).
- [ ] CSRF, security headers, XSS prevention.
- [ ] Playwright E2E tests for core booking flows.
- [ ] Comprehensive unit & integration test suite execution.
- [ ] Accessibility (WCAG 2.1 AA) review.
- [ ] SEO audit (sitemap.xml, robots.txt, metadata, Open Graph, JSON-LD Schema).

### Phase 8: Production Readiness & Handover
- [ ] Docker / production build validation.
- [ ] Deployment runbooks and database backup procedures (`docs/deployment.md`, `docs/database.md`).
- [ ] Final verification against "Definition of Done".
