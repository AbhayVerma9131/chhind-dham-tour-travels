import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createVehicleSchema = z.object({
  name: z.string().min(2, "Name is required"),
  brand: z.string().min(2, "Brand is required"),
  model: z.string().optional(),
  category: z.string().optional(),
  seatingCapacity: z.number().int().positive().optional().nullable(),
  transmission: z.string().optional().nullable(),
  fuelType: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  supportedModes: z.array(z.string()).default(["SELF_DRIVE", "CHAUFFEUR"]),
  // Pricing inputs
  ratePerKm: z.number().positive().optional().nullable(),
  selfDrive6h: z.number().positive().optional().nullable(),
  selfDrive12h: z.number().positive().optional().nullable(),
  selfDrive24h: z.number().positive().optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        rates: { where: { isActive: true } },
      },
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    });
    return NextResponse.json({ success: true, data: vehicles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve vehicles." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = createVehicleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      name,
      brand,
      model,
      category,
      seatingCapacity,
      transmission,
      fuelType,
      description,
      imageUrl,
      isFeatured,
      isActive,
      supportedModes,
      ratePerKm,
      selfDrive6h,
      selfDrive12h,
      selfDrive24h,
    } = parsed.data;

    // Generate unique slug
    let baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    if (!baseSlug) baseSlug = "vehicle";

    let slug = baseSlug;
    let count = 1;
    while (await prisma.vehicle.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        slug,
        brand,
        model: model || null,
        category: category || "Car",
        seatingCapacity: seatingCapacity || null,
        transmission: transmission || null,
        fuelType: fuelType || null,
        description: description || null,
        isFeatured: isFeatured || false,
        isActive: isActive !== undefined ? isActive : true,
        supportedModes: supportedModes || ["SELF_DRIVE", "CHAUFFEUR"],
        images: imageUrl
          ? {
              create: [
                {
                  imageUrl: imageUrl.trim(),
                  altText: `${name} - छिंद धाम TOUR TRAVELS`,
                  isPrimary: true,
                  displayOrder: 0,
                },
              ],
            }
          : undefined,
      },
    });

    // Create Rates if supplied
    const ratePromises = [];

    if (ratePerKm && ratePerKm > 0) {
      ratePromises.push(
        prisma.rentalRate.create({
          data: {
            vehicleId: vehicle.id,
            rentalType: "CHAUFFEUR",
            seatCategory: seatingCapacity || 5,
            ratePerKm,
            isActive: true,
          },
        })
      );
    }

    if (selfDrive6h && selfDrive6h > 0) {
      ratePromises.push(
        prisma.rentalRate.create({
          data: {
            vehicleId: vehicle.id,
            rentalType: "SELF_DRIVE",
            durationHours: 6,
            basePrice: selfDrive6h,
            isActive: true,
          },
        })
      );
    }

    if (selfDrive12h && selfDrive12h > 0) {
      ratePromises.push(
        prisma.rentalRate.create({
          data: {
            vehicleId: vehicle.id,
            rentalType: "SELF_DRIVE",
            durationHours: 12,
            basePrice: selfDrive12h,
            isActive: true,
          },
        })
      );
    }

    if (selfDrive24h && selfDrive24h > 0) {
      ratePromises.push(
        prisma.rentalRate.create({
          data: {
            vehicleId: vehicle.id,
            rentalType: "SELF_DRIVE",
            durationHours: 24,
            basePrice: selfDrive24h,
            isActive: true,
          },
        })
      );
    }

    if (ratePromises.length > 0) {
      await Promise.all(ratePromises);
    }

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          adminUserId: session.userId.startsWith("admin-dev") ? null : session.userId,
          action: "CREATE",
          targetEntity: "VEHICLE",
          targetId: vehicle.id,
          details: { name: vehicle.name, slug: vehicle.slug },
        },
      });
    } catch {}

    const completeVehicle = await prisma.vehicle.findUnique({
      where: { id: vehicle.id },
      include: { images: true, rates: true },
    });

    return NextResponse.json({
      success: true,
      message: `Vehicle "${vehicle.name}" added successfully.`,
      data: completeVehicle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to add vehicle." },
      { status: 500 }
    );
  }
}
