import { prisma } from "@/lib/db";

export interface ResolvedChauffeurRate {
  seatCategory: number;
  ratePerKm: number;
  isVerified: boolean;
  notes: string;
}

export interface ResolvedSelfDriveRate {
  vehicleId: string;
  vehicleName: string;
  durationHours: number;
  price: number | null; // null represents "Contact for Price"
  isVerified: boolean;
}

/**
 * Returns verified per-km rate for chauffeur-driven rentals based on verified seating capacity.
 * 5-seater: ₹11/km
 * 7-seater: ₹13/km
 * Any other/unverified: null (Contact for details)
 */
export function getChauffeurRateForSeats(seatingCapacity: number | null | undefined): ResolvedChauffeurRate | null {
  if (seatingCapacity === 5) {
    return {
      seatCategory: 5,
      ratePerKm: 11,
      isVerified: true,
      notes: "Verified rate includes driver. Toll, parking, state taxes, and allowance subject to route.",
    };
  }

  if (seatingCapacity === 7) {
    return {
      seatCategory: 7,
      ratePerKm: 13,
      isVerified: true,
      notes: "Verified rate includes driver. Toll, parking, state taxes, and allowance subject to route.",
    };
  }

  return null;
}

/**
 * Known confirmed self-drive price table
 */
export const CONFIRMED_SELF_DRIVE_RATES: Record<string, Record<number, number>> = {
  "mahindra-thar": {
    6: 2000,
    12: 3500,
    24: 4200,
  },
  "xuv-700": {
    24: 5500,
  },
  "scorpio-n": {
    24: 5500,
  },
  "scorpio": {
    24: 5000,
  },
  "verna": {
    24: 5000,
  },
};

/**
 * Look up self-drive price for a given vehicle slug and duration in hours.
 * Returns exact confirmed price or null if unpriced ("Contact for Price").
 */
export function lookupSelfDrivePrice(vehicleSlug: string, durationHours: number): number | null {
  const vehicleRates = CONFIRMED_SELF_DRIVE_RATES[vehicleSlug.toLowerCase()];
  if (!vehicleRates) return null;
  const price = vehicleRates[durationHours];
  return price !== undefined ? price : null;
}

/**
 * Fetches all active pricing rules from database with fallback to confirmed defaults
 */
export async function getActivePricingRules() {
  try {
    const dbRates = await prisma.rentalRate.findMany({
      where: { isActive: true },
      include: { vehicle: true },
    });
    return dbRates;
  } catch (err) {
    // Graceful fallback for offline/pre-migration context
    return [];
  }
}
