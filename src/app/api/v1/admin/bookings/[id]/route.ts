import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { updateBookingStatus } from "@/server/services/booking.service";
import { updateBookingStatusSchema } from "@/server/validators/booking.schema";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Enforce server-side authorization
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = updateBookingStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { status, adminNotes } = parsed.data;
    const updatedBooking = await updateBookingStatus(
      params.id,
      status,
      adminNotes,
      session.email
    );

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          adminUserId: session.userId.startsWith("admin-dev") ? null : session.userId,
          action: "STATUS_CHANGE",
          targetEntity: "BOOKING",
          targetId: params.id,
          details: { newStatus: status, notes: adminNotes },
        },
      });
    } catch {
      // Ignore audit fail in offline mode
    }

    return NextResponse.json({
      success: true,
      message: `Booking status successfully updated to ${status}.`,
      data: updatedBooking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update booking status." },
      { status: 400 }
    );
  }
}
