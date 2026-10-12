import { describe, it, expect } from "vitest";
import {
  getChauffeurRateForSeats,
  lookupSelfDrivePrice,
} from "@/server/services/pricing.service";

describe("Pricing Service", () => {
  describe("getChauffeurRateForSeats", () => {
    it("returns ₹11/km for verified 5-seater vehicles", () => {
      const rate = getChauffeurRateForSeats(5);
      expect(rate).not.toBeNull();
      expect(rate?.ratePerKm).toBe(11);
      expect(rate?.seatCategory).toBe(5);
      expect(rate?.isVerified).toBe(true);
    });

    it("returns ₹13/km for verified 7-seater vehicles", () => {
      const rate = getChauffeurRateForSeats(7);
      expect(rate).not.toBeNull();
      expect(rate?.ratePerKm).toBe(13);
      expect(rate?.seatCategory).toBe(7);
      expect(rate?.isVerified).toBe(true);
    });

    it("returns null for unverified or unsupported seating capacities", () => {
      expect(getChauffeurRateForSeats(4)).toBeNull();
      expect(getChauffeurRateForSeats(9)).toBeNull();
      expect(getChauffeurRateForSeats(null)).toBeNull();
      expect(getChauffeurRateForSeats(undefined)).toBeNull();
    });
  });

  describe("lookupSelfDrivePrice", () => {
    it("returns confirmed prices for Mahindra Thar at 6h, 12h, and 24h", () => {
      expect(lookupSelfDrivePrice("mahindra-thar", 6)).toBe(2000);
      expect(lookupSelfDrivePrice("mahindra-thar", 12)).toBe(3500);
      expect(lookupSelfDrivePrice("mahindra-thar", 24)).toBe(4200);
    });

    it("returns confirmed 24h prices for XUV 700, Scorpio-N, Scorpio, and Verna", () => {
      expect(lookupSelfDrivePrice("xuv-700", 24)).toBe(5500);
      expect(lookupSelfDrivePrice("scorpio-n", 24)).toBe(5500);
      expect(lookupSelfDrivePrice("scorpio", 24)).toBe(5000);
      expect(lookupSelfDrivePrice("verna", 24)).toBe(5000);
    });

    it("returns null for unpriced durations without inventing rates", () => {
      expect(lookupSelfDrivePrice("xuv-700", 6)).toBeNull();
      expect(lookupSelfDrivePrice("xuv-700", 12)).toBeNull();
      expect(lookupSelfDrivePrice("scorpio-n", 6)).toBeNull();
      expect(lookupSelfDrivePrice("verna", 12)).toBeNull();
    });

    it("returns null for unknown vehicles or vehicles with no self-drive pricing", () => {
      expect(lookupSelfDrivePrice("unknown-car", 24)).toBeNull();
      expect(lookupSelfDrivePrice("victoris", 24)).toBeNull();
    });
  });
});
