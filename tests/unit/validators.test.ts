import { describe, it, expect } from "vitest";
import { createBookingSchema } from "@/server/validators/booking.schema";
import { contactEnquirySchema } from "@/server/validators/contact.schema";

describe("Validation Schemas", () => {
  describe("createBookingSchema", () => {
    const validBooking = {
      customerName: "Rahul Sharma",
      customerPhone: "9876543210",
      customerEmail: "rahul@example.com",
      rentalType: "SELF_DRIVE",
      pickupDate: new Date(Date.now() + 86400000).toISOString(),
      pickupLocation: "Bhopal Railway Station",
    };

    it("accepts valid booking input", () => {
      const result = createBookingSchema.safeParse(validBooking);
      expect(result.success).toBe(true);
    });

    it("rejects invalid Indian phone numbers", () => {
      const result = createBookingSchema.safeParse({
        ...validBooking,
        customerPhone: "12345", // too short, doesn't start with 6-9
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.customerPhone).toBeDefined();
      }
    });

    it("rejects return dates that occur before pickup date", () => {
      const pickup = new Date(Date.now() + 86400000);
      const invalidReturn = new Date(pickup.getTime() - 3600000); // 1 hour before pickup

      const result = createBookingSchema.safeParse({
        ...validBooking,
        pickupDate: pickup.toISOString(),
        returnDate: invalidReturn.toISOString(),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.returnDate).toBeDefined();
      }
    });

    it("requires tourPackageId when rentalType is TOUR_PACKAGE", () => {
      const result = createBookingSchema.safeParse({
        ...validBooking,
        rentalType: "TOUR_PACKAGE",
        tourPackageId: null,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.tourPackageId).toBeDefined();
      }
    });
  });

  describe("contactEnquirySchema", () => {
    it("validates legitimate contact enquiry", () => {
      const result = contactEnquirySchema.safeParse({
        name: "Pooja Verma",
        phone: "9123456789",
        email: "pooja@gmail.com",
        message: "Inquiring about weekend car rental rates in Bhopal.",
      });
      expect(result.success).toBe(true);
    });

    it("rejects messages shorter than 10 characters", () => {
      const result = contactEnquirySchema.safeParse({
        name: "Pooja Verma",
        phone: "9123456789",
        message: "Hi",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.message).toBeDefined();
      }
    });
  });
});
