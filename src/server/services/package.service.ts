import { prisma } from "@/lib/db";

export interface ConfirmedTourPackageSeed {
  title: string;
  slug: string;
  origin: string;
  destination: string;
  basePrice: number;
  vehicleModel?: string;
  description: string;
  isPublished: boolean;
  isFeatured: boolean;
  inclusionsNotes: string;
}

export const SEED_TOUR_PACKAGES: ConfirmedTourPackageSeed[] = [
  {
    title: "Bhopal to Maihar Sharda Maa Darshan",
    slug: "bhopal-to-maihar",
    origin: "Bhopal",
    destination: "Maihar",
    basePrice: 13000,
    vehicleModel: "Maruti Suzuki Ertiga",
    description: "Pilgrimage journey from Bhopal to Maa Sharda Temple in Maihar. Dedicated vehicle for family and group darshan.",
    isPublished: true,
    isFeatured: true,
    inclusionsNotes: "Rate supplied for Ertiga. Specific inclusions (toll, parking, driver stay, schedule) to be confirmed upon booking enquiry.",
  },
  {
    title: "Bhopal to Maa Bagalamukhi Dham (Nalkheda)",
    slug: "bhopal-to-bagalamukhi-dham",
    origin: "Bhopal",
    destination: "Bagalamukhi Dham, Nalkheda",
    basePrice: 5100,
    vehicleModel: "Maruti Suzuki Ertiga",
    description: "Sacred pilgrimage journey to Maa Bagalamukhi Temple at Nalkheda from Bhopal. Comfortable round-trip transit.",
    isPublished: true,
    isFeatured: true,
    inclusionsNotes: "Rate supplied for Ertiga. Specific inclusions (toll, parking, schedule) to be confirmed upon booking enquiry.",
  },
  {
    title: "Shubh Navratri Special Pilgrimage Offer",
    slug: "shubh-navratri-special",
    origin: "Bhopal",
    destination: "Devi Darshan Route (Contact for details)",
    basePrice: 2750,
    description: "Festive Navratri pilgrimage travel offer for devotees departing from Bhopal.",
    isPublished: true,
    isFeatured: false,
    inclusionsNotes: "Special festive promotional rate. Exact destination and travel conditions to be confirmed by admin.",
  },
];

export async function getAllTourPackages() {
  try {
    const dbPackages = await prisma.tourPackage.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { title: "asc" }],
    });
    if (dbPackages.length > 0) return dbPackages;
  } catch (err) {
    // Fall back to seed data if database is initializing
  }
  return SEED_TOUR_PACKAGES.map((p, i) => ({
    id: `seed-pkg-${i}`,
    ...p,
    vehicleModel: p.vehicleModel ?? null,
    inclusionsNotes: p.inclusionsNotes,
    itinerary: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

export async function getTourPackageBySlug(slug: string) {
  try {
    const pkg = await prisma.tourPackage.findUnique({
      where: { slug },
    });
    if (pkg) return pkg;
  } catch (err) {
    // Fall back to seed
  }
  const match = SEED_TOUR_PACKAGES.find((p) => p.slug === slug);
  if (!match) return null;
  return {
    id: `seed-pkg-${match.slug}`,
    ...match,
    vehicleModel: match.vehicleModel ?? null,
    inclusionsNotes: match.inclusionsNotes,
    itinerary: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
