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
  const fullNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
  const encodedMsg = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${fullNumber}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
}

/**
 * Returns the photo image URL for a vehicle model
 */
export function getCarImageUrl(slug?: string, customImage?: string): string {
  if (customImage && customImage.trim()) {
    return customImage;
  }
  if (!slug) return "/images/cars/ertiga.png";
  
  const knownSlugs = [
    "mahindra-thar",
    "xuv-700",
    "scorpio-n",
    "scorpio",
    "verna",
    "ertiga",
    "dzire",
    "aura",
    "victoris",
  ];
  
  if (knownSlugs.includes(slug.toLowerCase())) {
    return `/images/cars/${slug.toLowerCase()}.png`;
  }
  
  return "/images/cars/ertiga.png";
}

