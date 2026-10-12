# Database Maintenance & Migration Runbook — छिंद धाम TOUR TRAVELS

## 1. Database Architecture
- **Engine:** PostgreSQL 15+ with SSL connection enforcement.
- **ORM:** Prisma v5 with parameterized query protection.
- **Connection Pooling:** In production, use pooled connection string (PgBouncer or Supabase transaction pooler) with `sslmode=require`.

---

## 2. Migration Workflow

### Local Development / Schema Changes
To create a new migration when updating `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name describe_change
```

### Staging & Production Deployment
**Never run `migrate dev` or `db push` in production environments.** Apply migrations safely using:
```bash
npx prisma migrate deploy
```

---

## 3. Database Seeding
To populate the 9 confirmed fleet vehicles, chauffeur benchmark tariffs, self-drive rates, pilgrimage packages, and business settings:
```bash
npx tsx prisma/seed.ts
# or
node --loader ts-node/esm prisma/seed.ts
```

---

## 4. Backup & Disaster Recovery Procedures

### Automated Backup Command
Execute automated logical daily dumps:
```bash
pg_dump -U postgres -h <HOST> -d chhind_dham_travels -F c -b -v -f "./backups/backup_$(date +%Y%m%d_%H%M%S).dump"
```

### Restoration Command
To restore from a backup file:
```bash
pg_restore -U postgres -h <HOST> -d chhind_dham_travels -v -c "./backups/backup_TARGET.dump"
```

---

## 5. Security & Secret Rotation Procedures
1. **Rotating `AUTH_SECRET`**:
   - Generate a new 32-byte secret (`openssl rand -base64 32`).
   - Update `AUTH_SECRET` in environment variables.
   - Restart the application. (Active sessions will be invalidated, prompting re-login).
2. **Rotating Admin Passwords**:
   - Update the admin record directly through the admin portal or update `passwordHash` using a freshly generated bcrypt hash (cost factor 10-12).
