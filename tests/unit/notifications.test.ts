import { describe, it, expect } from "vitest";
import {
  SafeLogNotificationAdapter,
  generateWhatsAppBookingSummary,
} from "@/server/notifications/adapter";

describe("Notifications System", () => {
  const samplePayload = {
    referenceNumber: "CDT-20261013-A8F2",
    customerName: "Mohit Verma",
    customerPhone: "9876543210",
    customerEmail: "mohit@example.com",
    rentalType: "SELF_DRIVE",
    vehicleOrPackageName: "Mahindra Thar",
    pickupDate: "2026-10-15",
    pickupLocation: "Bhopal Junction",
    status: "PENDING",
  };

  it("handles customer acknowledgement cleanly with safe logging adapter", async () => {
    const adapter = new SafeLogNotificationAdapter();
    const result = await adapter.sendCustomerAcknowledgement(samplePayload);
    expect(result.sent).toBe(true);
    expect(result.provider).toBe("LOG_ADAPTER");
  });

  it("handles empty email without falsely claiming delivery", async () => {
    const adapter = new SafeLogNotificationAdapter();
    const result = await adapter.sendCustomerAcknowledgement({
      ...samplePayload,
      customerEmail: null,
    });
    expect(result.sent).toBe(false);
    expect(result.provider).toBe("NONE");
  });

  it("constructs accurate WhatsApp enquiry summary link with pre-filled details", () => {
    const link = generateWhatsAppBookingSummary("9691345722", samplePayload);
    expect(link).toContain("https://wa.me/919691345722");
    expect(link).toContain(encodeURIComponent("CDT-20261013-A8F2"));
    expect(link).toContain(encodeURIComponent("Mahindra Thar"));
    expect(link).toContain(encodeURIComponent("Mohit Verma"));
  });
});
