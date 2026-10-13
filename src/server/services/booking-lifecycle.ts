import { BookingStatus } from "@/server/validators/booking.schema";

/**
 * Valid status transitions matrix.
 * Enforces business lifecycle integrity.
 */
export const ALLOWED_STATUS_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  PENDING: ["CONTACTED", "CONFIRMED", "CANCELLED", "REJECTED"],
  CONTACTED: ["CONFIRMED", "CANCELLED", "REJECTED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  REJECTED: [],
  CANCELLED: [],
  COMPLETED: [],
};

/**
 * Checks whether a requested status transition is allowed.
 */
export function isValidStatusTransition(
  currentStatus: BookingStatus,
  targetStatus: BookingStatus
): boolean {
  if (currentStatus === targetStatus) return true;
  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus];
  return allowed.includes(targetStatus);
}

/**
 * Generates human-readable, unique booking reference number.
 * Format: CDT-YYYYMMDD-XXXX (e.g., CDT-20261013-A8F2)
 */
export function generateBookingReference(date: Date = new Date()): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  
  // 4 random uppercase alphanumeric characters
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Omitting ambiguous 0, O, 1, I
  let randomSuffix = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomSuffix += chars[randomIndex];
  }

  return `CDT-${yyyy}${mm}${dd}-${randomSuffix}`;
}
