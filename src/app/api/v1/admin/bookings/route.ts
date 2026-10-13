import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const raw = await prisma.bookingRequest.findMany({
      include: { vehicle: true, tourPackage: true },
      orderBy: { createdAt: "desc" },
    });

    const formattedBookings = raw.map((b) => ({
      id: b.id,
      referenceNumber: b.referenceNumber,
      customerName: b.customerName,
      customerPhone: b.customerPhone,
      customerEmail: b.customerEmail,
      rentalType: b.rentalType,
      vehicleName: b.vehicle?.name || null,
      packageName: b.tourPackage?.title || null,
      pickupDate: b.pickupDate.toISOString(),
      returnDate: b.returnDate ? b.returnDate.toISOString() : null,
      pickupLocation: b.pickupLocation,
      status: b.status,
      adminNotes: b.adminNotes,
      createdAt: b.createdAt.toISOString(),
    }));

    return NextResponse.json({ success: true, bookings: formattedBookings });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings.", bookings: [] },
      { status: 500 }
    );
  }
}
