import { prisma } from "@/lib/db";

export interface ConfirmedVehicleSeed {
  name: string;
  slug: string;
  brand: string;
  model?: string;
  category: string;
  seatingCapacity?: number;
  transmission?: string;
  fuelType?: string;
  luggageCapacity?: string;
  description: string;
  supportedModes: ("CHAUFFEUR" | "SELF_DRIVE")[];
  isFeatured: boolean;
}

/**
 * 9 confirmed seed vehicles strictly matching Section 4.1 of the spec.
 * Only confirmed attributes are provided.
 */
export const SEED_VEHICLES: ConfirmedVehicleSeed[] = [
  {
    name: "Mahindra Thar",
    slug: "mahindra-thar",
    brand: "Mahindra",
    model: "Thar 4x4",
    category: "SUV / Off-road",
    seatingCapacity: 4,
    transmission: "Manual / Automatic",
    fuelType: "Diesel / Petrol",
    description: "Rugged and iconic 4x4 SUV available for self-drive and chauffeur rentals in Bhopal.",
    supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
    isFeatured: true,
  },
  {
    name: "Mahindra XUV 700",
    slug: "xuv-700",
    brand: "Mahindra",
    model: "XUV 700",
    category: "Premium SUV",
    seatingCapacity: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    description: "Spacious 7-seater premium SUV with supreme highway comfort and modern safety features.",
    supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
    isFeatured: true,
  },
  {
    name: "Mahindra Scorpio-N",
    slug: "scorpio-n",
    brand: "Mahindra",
    model: "Scorpio-N",
    category: "SUV",
    seatingCapacity: 7,
    transmission: "Manual / Automatic",
    fuelType: "Diesel",
    description: "The all-new Scorpio-N featuring muscular presence and comfortable 7-seater layout.",
    supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
    isFeatured: true,
  },
  {
    name: "Mahindra Scorpio",
    slug: "scorpio",
    brand: "Mahindra",
    model: "Scorpio Classic",
    category: "SUV",
    seatingCapacity: 7,
    transmission: "Manual",
    fuelType: "Diesel",
    description: "Dependable, robust SUV trusted for Madhya Pradesh highway and rural travel.",
    supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
    isFeatured: false,
  },
  {
    name: "Hyundai Verna",
    slug: "verna",
    brand: "Hyundai",
    model: "Verna",
    category: "Sedan",
    seatingCapacity: 5,
    transmission: "Manual / Automatic",
    fuelType: "Petrol",
    description: "Sleek executive sedan offering superior ride smoothness for city and outstation journeys.",
    supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
    isFeatured: true,
  },
  {
    name: "Maruti Suzuki Ertiga",
    slug: "ertiga",
    brand: "Maruti Suzuki",
    model: "Ertiga",
    category: "MUV",
    seatingCapacity: 7,
    transmission: "Manual",
    fuelType: "CNG / Petrol",
    description: "Economical and comfortable 7-seater MUV, ideal for family pilgrimage and outstation tours.",
    supportedModes: ["CHAUFFEUR", "SELF_DRIVE"],
    isFeatured: true,
  },
  {
    name: "Maruti Suzuki Dzire",
    slug: "dzire",
    brand: "Maruti Suzuki",
    model: "Dzire",
    category: "Sedan",
    seatingCapacity: 5,
    transmission: "Manual / AMT",
    fuelType: "CNG / Petrol",
    description: "Efficient and comfortable compact sedan for city transit and local Bhopal rentals.",
    supportedModes: ["CHAUFFEUR", "SELF_DRIVE"],
    isFeatured: false,
  },
  {
    name: "Hyundai Aura",
    slug: "aura",
    brand: "Hyundai",
    model: "Aura",
    category: "Sedan",
    seatingCapacity: 5,
    transmission: "Manual",
    fuelType: "CNG / Petrol",
    description: "Compact sedan offering a refined cabin and reliable comfort for daily rentals.",
    supportedModes: ["CHAUFFEUR", "SELF_DRIVE"],
    isFeatured: false,
  },
  {
    name: "Victoris",
    slug: "victoris",
    brand: "Victoris",
    category: "Travel Vehicle",
    description: "Tour and travel carrier available on request for group journeys. Contact for full specifications.",
    supportedModes: ["CHAUFFEUR"],
    isFeatured: false,
  },
];

/**
 * Returns active vehicles for public catalogue
 */
export async function getAllVehicles() {
  try {
    const dbVehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      include: { images: { orderBy: { displayOrder: "asc" } }, rates: true },
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    });
    if (dbVehicles.length > 0) return dbVehicles;
  } catch (err) {
    // Fall back to seed data if database is initializing
  }
  return SEED_VEHICLES.map((v, i) => ({
    id: `seed-${i}`,
    ...v,
    model: v.model ?? null,
    seatingCapacity: v.seatingCapacity ?? null,
    transmission: v.transmission ?? null,
    fuelType: v.fuelType ?? null,
    luggageCapacity: v.luggageCapacity ?? null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [],
    rates: [],
  }));
}

/**
 * Returns all vehicles including inactive for Admin portal management
 */
export async function getAllVehiclesForAdmin() {
  try {
    const dbVehicles = await prisma.vehicle.findMany({
      include: { images: { orderBy: { displayOrder: "asc" } }, rates: true },
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    });
    if (dbVehicles.length > 0) return dbVehicles;
  } catch (err) {
    // Fall back to seed data
  }
  return SEED_VEHICLES.map((v, i) => ({
    id: `seed-${i}`,
    ...v,
    model: v.model ?? null,
    seatingCapacity: v.seatingCapacity ?? null,
    transmission: v.transmission ?? null,
    fuelType: v.fuelType ?? null,
    luggageCapacity: v.luggageCapacity ?? null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [],
    rates: [],
  }));
}

export async function getVehicleBySlug(slug: string) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { slug },
      include: { images: { orderBy: { displayOrder: "asc" } }, rates: true },
    });
    if (vehicle) return vehicle;
  } catch (err) {
    // Fall back to seed
  }
  const match = SEED_VEHICLES.find((v) => v.slug === slug);
  if (!match) return null;
  return {
    id: `seed-${match.slug}`,
    ...match,
    model: match.model ?? null,
    seatingCapacity: match.seatingCapacity ?? null,
    transmission: match.transmission ?? null,
    fuelType: match.fuelType ?? null,
    luggageCapacity: match.luggageCapacity ?? null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [],
    rates: [],
  };
}
