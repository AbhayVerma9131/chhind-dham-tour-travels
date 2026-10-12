import { describe, it, expect, vi } from "vitest";
import {
  createSessionToken,
  verifySessionToken,
  authenticateAdmin,
} from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

describe("Admin Authentication & Session System", () => {
  it("generates a signed session token that verifies successfully", async () => {
    const payload = {
      userId: "admin-test-1",
      email: "testadmin@chhinddhamtravels.com",
      name: "Test Admin",
      role: "ADMIN" as const,
    };

    const token = await createSessionToken(payload);
    expect(typeof token).toBe("string");
    expect(token.includes(".")).toBe(true);

    const verified = await verifySessionToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe(payload.email);
    expect(verified?.role).toBe("ADMIN");
  });

  it("rejects tokens that have been tampered with", async () => {
    const token = await createSessionToken({
      userId: "admin-1",
      email: "valid@chhinddhamtravels.com",
      name: "Admin",
      role: "ADMIN",
    });

    const parts = token.split(".");
    const tamperedToken = `tampered${parts[0]}.${parts[1]}`;

    const verified = await verifySessionToken(tamperedToken);
    expect(verified).toBeNull();
  });

  it("authenticates DB admin user when found", async () => {
    const hash = await bcrypt.hash("Secret123!", 10);
    vi.spyOn(prisma.adminUser, "findUnique").mockResolvedValueOnce({
      id: "admin-db-1",
      email: "staff@chhinddhamtravels.com",
      name: "Staff Admin",
      passwordHash: hash,
      role: "ADMIN",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    const valid = await authenticateAdmin(
      "staff@chhinddhamtravels.com",
      "Secret123!"
    );
    expect(valid).not.toBeNull();
    expect(valid?.email).toBe("staff@chhinddhamtravels.com");
  });

  it("authenticates valid admin fallback credentials and rejects wrong passwords", async () => {
    vi.spyOn(prisma.adminUser, "findUnique").mockResolvedValueOnce(null);

    const valid = await authenticateAdmin(
      "admin@chhinddhamtravels.com",
      "Admin@ChhindDham2026!"
    );
    expect(valid).not.toBeNull();
    expect(valid?.email).toBe("admin@chhinddhamtravels.com");

    vi.spyOn(prisma.adminUser, "findUnique").mockResolvedValueOnce(null);
    const invalid = await authenticateAdmin(
      "admin@chhinddhamtravels.com",
      "WrongPassword123"
    );
    expect(invalid).toBeNull();
  });
});

