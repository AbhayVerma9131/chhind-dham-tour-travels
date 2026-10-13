import { NextRequest, NextResponse } from "next/server";
import { createBookingEnquiry } from "@/server/services/booking.service";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit by client IP / header
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous-client";
  const rateLimit = checkRateLimit(`booking-post:${ip}`, 5, 60 * 1000); // 5 bookings per minute max

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many booking requests. Please wait a moment before trying again.",
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const result = await createBookingEnquiry(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your booking enquiry.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
