import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateVehicleSchema = z.object({
  name: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  seatingCapacity: z.number().int().positive().optional().nullable(),
  transmission: z.string().optional().nullable(),
  fuelType: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  supportedModes: z.array(z.string()).optional(),
  // Pricing updates
  ratePerKm: z.number().positive().optional().nullable(),
  selfDrive6h: z.number().positive().optional().nullable(),
  selfDrive12h: z.number().positive().optional().nullable(),
  selfDrive24h: z.number().positive().optional().nullable(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = updateVehicleSchema.safeParse(body);
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
      isActive,
      isFeatured,
      supportedModes,
      ratePerKm,
      selfDrive6h,
      selfDrive12h,
      selfDrive24h,
    } = parsed.data;

    // Check if vehicle exists in db
    let vehicle = await prisma.vehicle.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found in database." },
        { status: 404 }
      );
    }

    // Update vehicle properties
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (brand !== undefined) updateData.brand = brand;
    if (model !== undefined) updateData.model = model;
    if (category !== undefined) updateData.category = category;
    if (seatingCapacity !== undefined) updateData.seatingCapacity = seatingCapacity;
    if (transmission !== undefined) updateData.transmission = transmission;
    if (fuelType !== undefined) updateData.fuelType = fuelType;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
    if (supportedModes !== undefined) updateData.supportedModes = supportedModes;

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicle.id },
      data: updateData,
    });

    // Update image if supplied
    if (imageUrl && imageUrl.trim()) {
      await prisma.vehicleImage.deleteMany({ where: { vehicleId: vehicle.id } });
      await prisma.vehicleImage.create({
        data: {
          vehicleId: vehicle.id,
          imageUrl: imageUrl.trim(),
          isPrimary: true,
          displayOrder: 0,
        },
      });
    }

    // Update or upsert pricing rates
    if (ratePerKm !== undefined) {
      if (ratePerKm && ratePerKm > 0) {
        const existingChauffeur = await prisma.rentalRate.findFirst({
          where: { vehicleId: vehicle.id, rentalType: "CHAUFFEUR" },
        });
        if (existingChauffeur) {
          await prisma.rentalRate.update({
            where: { id: existingChauffeur.id },
            data: { ratePerKm, isActive: true },
          });
        } else {
          await prisma.rentalRate.create({
            data: {
              vehicleId: vehicle.id,
              rentalType: "CHAUFFEUR",
              seatCategory: updatedVehicle.seatingCapacity || 5,
              ratePerKm,
              isActive: true,
            },
          });
        }
      }
    }

    // Self-drive slabs
    const handleSelfDriveSlab = async (hours: number, price: number | null | undefined) => {
      if (price === undefined) return;
      const existing = await prisma.rentalRate.findFirst({
        where: { vehicleId: vehicle.id, rentalType: "SELF_DRIVE", durationHours: hours },
      });
      if (price && price > 0) {
        if (existing) {
          await prisma.rentalRate.update({
            where: { id: existing.id },
            data: { basePrice: price, isActive: true },
          });
        } else {
          await prisma.rentalRate.create({
            data: {
              vehicleId: vehicle.id,
              rentalType: "SELF_DRIVE",
              durationHours: hours,
              basePrice: price,
              isActive: true,
            },
          });
        }
      } else if (existing) {
        // Price was cleared or set to 0 -> deactivate or remove
        await prisma.rentalRate.delete({ where: { id: existing.id } });
      }
    };

    await handleSelfDriveSlab(6, selfDrive6h);
    await handleSelfDriveSlab(12, selfDrive12h);
    await handleSelfDriveSlab(24, selfDrive24h);

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          adminUserId: session.userId.startsWith("admin-dev") ? null : session.userId,
          action: "UPDATE",
          targetEntity: "VEHICLE",
          targetId: vehicle.id,
          details: updateData,
        },
      });
    } catch {}

    const result = await prisma.vehicle.findUnique({
      where: { id: vehicle.id },
      include: { images: true, rates: true },
    });

    return NextResponse.json({
      success: true,
      message: `Vehicle "${updatedVehicle.name}" updated successfully.`,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update vehicle." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found." },
        { status: 404 }
      );
    }

    // Delete associated rates and images
    await prisma.rentalRate.deleteMany({ where: { vehicleId: vehicle.id } });
    await prisma.vehicleImage.deleteMany({ where: { vehicleId: vehicle.id } });
    await prisma.vehicle.delete({ where: { id: vehicle.id } });

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          adminUserId: session.userId.startsWith("admin-dev") ? null : session.userId,
          action: "DELETE",
          targetEntity: "VEHICLE",
          targetId: vehicle.id,
          details: { name: vehicle.name, slug: vehicle.slug },
        },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      message: `Vehicle "${vehicle.name}" deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete vehicle." },
      { status: 500 }
    );
  }
}
