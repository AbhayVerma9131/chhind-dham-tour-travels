import { logger } from "@/lib/logger";
import { buildWhatsAppLink } from "@/lib/utils";

export interface BookingNotificationPayload {
  referenceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  rentalType: string;
  vehicleOrPackageName?: string;
  pickupDate: string;
  pickupLocation: string;
  status: string;
}

export interface NotificationAdapter {
  sendCustomerAcknowledgement(payload: BookingNotificationPayload): Promise<{
    sent: boolean;
    provider: string;
    message: string;
  }>;
  sendAdminAlert(payload: BookingNotificationPayload): Promise<{
    sent: boolean;
    provider: string;
  }>;
}

/**
 * Safe local development and fallback notification adapter.
 * Transparently logs notifications without leaking credentials or falsifying delivery.
 */
export class SafeLogNotificationAdapter implements NotificationAdapter {
  async sendCustomerAcknowledgement(payload: BookingNotificationPayload) {
    if (payload.customerEmail) {
      logger.info(
        `[SafeLog Notification] Customer acknowledgement prepared for ${payload.customerEmail} (Ref: ${payload.referenceNumber})`
      );
      return {
        sent: true,
        provider: "LOG_ADAPTER",
        message: "Acknowledgement recorded. Offline dev mode active.",
      };
    }
    return {
      sent: false,
      provider: "NONE",
      message: "No customer email provided for email acknowledgement.",
    };
  }

  async sendAdminAlert(payload: BookingNotificationPayload) {
    logger.info(
      `[SafeLog Notification] Admin alert triggered: New ${payload.rentalType} request from ${payload.customerName} (${payload.customerPhone}) [${payload.referenceNumber}]`
    );
    return {
      sent: true,
      provider: "LOG_ADAPTER",
    };
  }
}

/**
 * Returns active notification adapter based on environment configuration
 */
export function getNotificationAdapter(): NotificationAdapter {
  // If external credentials like SMTP_HOST are configured, SMTP adapter could be mounted here.
  // Defaults to SafeLogNotificationAdapter.
  return new SafeLogNotificationAdapter();
}

/**
 * Generates direct WhatsApp message linking the booking enquiry for customer or admin dispatch
 */
export function generateWhatsAppBookingSummary(
  targetPhone: string,
  payload: BookingNotificationPayload
): string {
  const message = [
    `*छिंद धाम TOUR TRAVELS — Booking Enquiry*`,
    `Reference: ${payload.referenceNumber}`,
    `Customer: ${payload.customerName}`,
    `Phone: ${payload.customerPhone}`,
    `Rental Type: ${payload.rentalType}`,
    payload.vehicleOrPackageName ? `Selected: ${payload.vehicleOrPackageName}` : null,
    `Pickup Date: ${payload.pickupDate}`,
    `Location: ${payload.pickupLocation}`,
    `Status: ${payload.status}`,
  ]
    .filter(Boolean)
    .join("\n");

  return buildWhatsAppLink(targetPhone, message);
}
