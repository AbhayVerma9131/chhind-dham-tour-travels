import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Indian Rupee format (INR, ₹)
 */
export function formatINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Contact for Price";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats phone number for tel: link
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Builds direct WhatsApp click-to-chat URL with optional pre-filled message
 */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const cleanNumber = sanitizePhone(phone).replace(/^\+/, "");
  // If no country code, prefix 91 for India
  const fullNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
  const encodedMsg = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${fullNumber}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
}
