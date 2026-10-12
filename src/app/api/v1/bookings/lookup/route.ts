import { NextRequest, NextResponse } from "next/server";
import { getBookingByReference } from "@/server/services/booking.service";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous-client";

  // Rate limit tracking lookups: max 15 lookups per minute
  const rateLimit = checkRateLimit(`booking-track:${ip}`, 15, 60 * 1000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, message: "Too many tracking lookups. Please wait a minute." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref");

  if (!ref || ref.trim().length < 5) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid reference number." },
      { status: 400 }
    );
  }

  try {
    const booking = await getBookingByReference(ref.trim().toUpperCase());
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "No enquiry found matching this reference number." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        referenceNumber: booking.referenceNumber,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        rentalType: booking.rentalType,
        vehicleOrPackage: booking.vehicle?.name || booking.tourPackage?.title || "General Enquiry",
        pickupDate: booking.pickupDate.toISOString().slice(0, 10),
        returnDate: booking.returnDate ? booking.returnDate.toISOString().slice(0, 10) : null,
        pickupLocation: booking.pickupLocation,
        status: booking.status,
        createdAt: booking.createdAt.toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to look up booking enquiry." },
      { status: 500 }
    );
  }
}
