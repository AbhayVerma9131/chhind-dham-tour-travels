import { describe, it, expect } from "vitest";
import {
  generateBookingReference,
  isValidStatusTransition,
} from "@/server/services/booking-lifecycle";

describe("Booking Lifecycle & Reference", () => {
  describe("generateBookingReference", () => {
    it("generates a reference matching CDT-YYYYMMDD-XXXX format", () => {
      const ref = generateBookingReference(new Date("2026-10-15T00:00:00Z"));
      expect(ref).toMatch(/^CDT-20261015-[A-Z0-9]{4}$/);
    });

    it("generates distinct references on successive calls", () => {
      const set = new Set<string>();
      for (let i = 0; i < 50; i++) {
        set.add(generateBookingReference());
      }
      expect(set.size).toBe(50);
    });
  });

  describe("isValidStatusTransition", () => {
    it("permits initial transitions from PENDING", () => {
      expect(isValidStatusTransition("PENDING", "CONTACTED")).toBe(true);
      expect(isValidStatusTransition("PENDING", "REJECTED")).toBe(true);
      expect(isValidStatusTransition("PENDING", "CANCELLED")).toBe(true);
    });

    it("forbids jumping directly from PENDING to COMPLETED", () => {
      expect(isValidStatusTransition("PENDING", "COMPLETED")).toBe(false);
    });

    it("permits transitions from CONTACTED to CONFIRMED", () => {
      expect(isValidStatusTransition("CONTACTED", "CONFIRMED")).toBe(true);
      expect(isValidStatusTransition("CONTACTED", "CANCELLED")).toBe(true);
      expect(isValidStatusTransition("CONTACTED", "REJECTED")).toBe(true);
    });

    it("permits transitions from CONFIRMED to COMPLETED or CANCELLED", () => {
      expect(isValidStatusTransition("CONFIRMED", "COMPLETED")).toBe(true);
      expect(isValidStatusTransition("CONFIRMED", "CANCELLED")).toBe(true);
    });

    it("forbids transitions from terminal states", () => {
      expect(isValidStatusTransition("REJECTED", "CONFIRMED")).toBe(false);
      expect(isValidStatusTransition("CANCELLED", "PENDING")).toBe(false);
      expect(isValidStatusTransition("COMPLETED", "PENDING")).toBe(false);
      expect(isValidStatusTransition("COMPLETED", "CONFIRMED")).toBe(false);
    });

    it("permits no-op transitions (currentStatus === targetStatus)", () => {
      expect(isValidStatusTransition("PENDING", "PENDING")).toBe(true);
      expect(isValidStatusTransition("CONFIRMED", "CONFIRMED")).toBe(true);
    });
  });
});
