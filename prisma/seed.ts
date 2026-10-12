import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database for छिंद धाम TOUR TRAVELS...");

  // 1. Seed Business Settings
  const businessSettings = [
    { key: "BUSINESS_NAME", value: "छिंद धाम TOUR TRAVELS", category: "GENERAL", description: "Official business name" },
    { key: "PRIMARY_CONTACT_NAME", value: "Karan Kushwaha", category: "CONTACT", description: "Primary contact person" },
    { key: "PRIMARY_CONTACT_PHONE", value: "9691345722", category: "CONTACT", description: "Primary WhatsApp and mobile number" },
    { key: "SECONDARY_CONTACT_NAME", value: "Akash Ahirwar", category: "CONTACT", description: "Secondary contact person" },
    { key: "SECONDARY_CONTACT_PHONE", value: "7400950207", category: "CONTACT", description: "Secondary contact phone number" },
    { key: "BUSINESS_ADDRESS", value: "Bhanpur, Bhopal, Madhya Pradesh, India", category: "CONTACT", description: "Physical operations location" },
    { key: "CHAUFFEUR_TERMS_NOTE", value: "Toll, parking, interstate taxes, and night allowance subject to route confirmation.", category: "PRICING_POLICY", description: "Unconfirmed terms notice" },
    { key: "SELF_DRIVE_TERMS_NOTE", value: "Security deposit, km limit, and fuel policy to be confirmed upon reservation.", category: "PRICING_POLICY", description: "Unconfirmed self-drive terms" },
  ];

  for (const setting of businessSettings) {
    await prisma.businessSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  // 2. Seed Default Admin User
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "Admin@ChhindDham2026!";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@chhinddhamtravels.com" },
    update: {},
    create: {
      email: "admin@chhinddhamtravels.com",
      name: " छिंद धाम Admin",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  // 3. Seed Vehicles
  const vehiclesData = [
    {
      name: "Mahindra Thar",
      slug: "mahindra-thar",
      brand: "Mahindra",
      model: "Thar 4x4",
      category: "SUV / Off-road",
      seatingCapacity: 4,
      transmission: "Manual / Automatic",
      fuelType: "Diesel / Petrol",
      description: "Iconic 4x4 off-roader available for self-drive and chauffeur rentals.",
      supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
      isFeatured: true,
      rates: [
        { rentalType: "SELF_DRIVE" as const, durationHours: 6, basePrice: 2000 },
        { rentalType: "SELF_DRIVE" as const, durationHours: 12, basePrice: 3500 },
        { rentalType: "SELF_DRIVE" as const, durationHours: 24, basePrice: 4200 },
      ],
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
      description: "Spacious 7-seater premium SUV with supreme comfort and advanced safety.",
      supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
      isFeatured: true,
      rates: [
        { rentalType: "SELF_DRIVE" as const, durationHours: 24, basePrice: 5500 },
        { rentalType: "CHAUFFEUR" as const, seatCategory: 7, ratePerKm: 13 },
      ],
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
      description: "All-new Scorpio-N featuring muscular presence and comfortable 7-seater seating.",
      supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
      isFeatured: true,
      rates: [
        { rentalType: "SELF_DRIVE" as const, durationHours: 24, basePrice: 5500 },
        { rentalType: "CHAUFFEUR" as const, seatCategory: 7, ratePerKm: 13 },
      ],
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
      description: "Dependable, robust SUV trusted for Madhya Pradesh highway and rural tours.",
      supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
      isFeatured: false,
      rates: [
        { rentalType: "SELF_DRIVE" as const, durationHours: 24, basePrice: 5000 },
        { rentalType: "CHAUFFEUR" as const, seatCategory: 7, ratePerKm: 13 },
      ],
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
      description: "Sleek executive sedan offering superior ride smoothness and comfort.",
      supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
      isFeatured: true,
      rates: [
        { rentalType: "SELF_DRIVE" as const, durationHours: 24, basePrice: 5000 },
        { rentalType: "CHAUFFEUR" as const, seatCategory: 5, ratePerKm: 11 },
      ],
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
      description: "Economical and comfortable 7-seater MUV, ideal for family pilgrimage trips.",
      supportedModes: ["CHAUFFEUR", "SELF_DRIVE"],
      isFeatured: true,
      rates: [
        { rentalType: "CHAUFFEUR" as const, seatCategory: 7, ratePerKm: 13 },
      ],
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
      description: "Efficient and comfortable compact sedan for city and local Bhopal transit.",
      supportedModes: ["CHAUFFEUR", "SELF_DRIVE"],
      isFeatured: false,
      rates: [
        { rentalType: "CHAUFFEUR" as const, seatCategory: 5, ratePerKm: 11 },
      ],
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
      rates: [
        { rentalType: "CHAUFFEUR" as const, seatCategory: 5, ratePerKm: 11 },
      ],
    },
    {
      name: "Victoris",
      slug: "victoris",
      brand: "Victoris",
      category: "Travel Vehicle",
      description: "Tour and travel carrier available on request for group journeys. Contact for full specifications.",
      supportedModes: ["CHAUFFEUR"],
      isFeatured: false,
      rates: [],
    },
  ];

  for (const v of vehiclesData) {
    const { rates, ...vehicleDetails } = v;
    const vehicle = await prisma.vehicle.upsert({
      where: { slug: vehicleDetails.slug },
      update: vehicleDetails,
      create: vehicleDetails,
    });

    for (const rate of rates) {
      await prisma.rentalRate.create({
        data: {
          vehicleId: vehicle.id,
          rentalType: rate.rentalType,
          durationHours: "durationHours" in rate ? rate.durationHours : null,
          seatCategory: "seatCategory" in rate ? rate.seatCategory : null,
          basePrice: "basePrice" in rate ? rate.basePrice : null,
          ratePerKm: "ratePerKm" in rate ? rate.ratePerKm : null,
        },
      });
    }
  }

  // 4. Seed General Chauffeur Benchmark Rates (by seating category)
  await prisma.rentalRate.createMany({
    data: [
      {
        rentalType: "CHAUFFEUR",
        seatCategory: 5,
        ratePerKm: 11,
        notes: "Verified rate for 5-seater category vehicles with driver.",
      },
      {
        rentalType: "CHAUFFEUR",
        seatCategory: 7,
        ratePerKm: 13,
        notes: "Verified rate for 7-seater category vehicles with driver.",
      },
    ],
  });

  // 5. Seed Confirmed Tour Packages
  const tourPackagesData = [
    {
      slug: "bhopal-to-maihar",
      title: "Bhopal to Maihar Sharda Maa Darshan",
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
      slug: "bhopal-to-bagalamukhi-dham",
      title: "Bhopal to Maa Bagalamukhi Dham (Nalkheda)",
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
      slug: "shubh-navratri-special",
      title: "Shubh Navratri Special Pilgrimage Offer",
      origin: "Bhopal",
      destination: "Devi Darshan Route (Contact for details)",
      basePrice: 2750,
      description: "Festive Navratri pilgrimage travel offer for devotees departing from Bhopal.",
      isPublished: true,
      isFeatured: false,
      inclusionsNotes: "Special festive promotional rate. Exact destination and travel conditions to be confirmed by admin.",
    },
  ];

  for (const pkg of tourPackagesData) {
    await prisma.tourPackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }

  console.log("✅ Database successfully seeded with confirmed data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
