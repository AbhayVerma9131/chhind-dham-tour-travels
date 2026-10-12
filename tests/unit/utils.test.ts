import { describe, it, expect } from "vitest";
import { formatINR, sanitizePhone, buildWhatsAppLink } from "@/lib/utils";

describe("Utility Functions", () => {
  describe("formatINR", () => {
    it("formats Indian Rupee numbers accurately", () => {
      expect(formatINR(2000)).toMatch(/₹\s?2,000/);
      expect(formatINR(13000)).toMatch(/₹\s?13,000/);
    });

    it("returns 'Contact for Price' when amount is null, undefined, or NaN", () => {
      expect(formatINR(null)).toBe("Contact for Price");
      expect(formatINR(undefined)).toBe("Contact for Price");
      expect(formatINR(NaN)).toBe("Contact for Price");
    });
  });

  describe("sanitizePhone", () => {
    it("strips special characters leaving digits and plus", () => {
      expect(sanitizePhone("+91 96913-45722")).toBe("+919691345722");
      expect(sanitizePhone("(74009) 50207")).toBe("7400950207");
    });
  });

  describe("buildWhatsAppLink", () => {
    it("constructs correct wa.me link with 91 prefix for 10-digit Indian numbers", () => {
      const link = buildWhatsAppLink("9691345722", "Hello छिंद धाम TOUR TRAVELS");
      expect(link).toContain("https://wa.me/919691345722");
      expect(link).toContain(encodeURIComponent("Hello छिंद धाम TOUR TRAVELS"));
    });
  });
});
