# Security Policy — छिंद धाम TOUR TRAVELS

## Overview
Security is a primary concern for **छिंद धाम TOUR TRAVELS**. We adhere to strict standards to protect customer contact data, administrative credentials, and operational infrastructure.

---

## Core Security Controls

1. **Authentication & Password Storage**:
   - Administrative credentials use strong hashing algorithms (bcrypt with cost factor 12).
   - Plaintext passwords are never stored in databases, logs, or backups.
   - Admin sessions rely on secure, HttpOnly, SameSite cookies.

2. **Authorization & RBAC**:
   - Access to administrative routes (`/admin/*`) and administrative API endpoints (`/api/v1/admin/*`) is verified server-side.
   - Client-side visibility controls are strictly cosmetic; all operations require server-side permission checks.

3. **Input Validation & Sanitization**:
   - All inbound payloads are validated against strict Zod schemas.
   - Unexpected fields are stripped.
   - Data types, string lengths, phone numbers, and dates are checked before reaching business logic or the database.

4. **Database Safety**:
   - All database interaction occurs via Prisma ORM using parameterized queries, preventing SQL injection.
   - Destructive operations (dropping tables, truncate) are forbidden in production migration workflows.

5. **Secrets & Environment Variables**:
   - Database connection URLs, session secrets, and API credentials are kept strictly in environment variables.
   - `.env` files are never committed to version control.
   - Client-side code (`NEXT_PUBLIC_*`) contains zero secrets.

6. **Rate Limiting & Abuse Prevention**:
   - Public submission endpoints (`/api/v1/bookings`, `/api/v1/contact`, `/api/v1/admin/login`) are protected with rate limiting to prevent spam and credential stuffing.
   - Error messages in production do not reveal stack traces or database error details.

---

## Vulnerability Reporting
For reporting security issues or vulnerabilities, contact the system administrators directly via the contact details documented in `ANTIGRAVITY_MASTER_SPEC.md`.
