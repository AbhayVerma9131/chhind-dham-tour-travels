import { NextRequest, NextResponse } from "next/server";
import { createContactEnquiry } from "@/server/services/enquiry.service";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous-client";
  const rateLimit = checkRateLimit(`contact-post:${ip}`, 5, 60 * 1000);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many messages sent. Please wait a minute or contact us directly on WhatsApp.",
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const result = await createContactEnquiry(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while saving your message.",
      },
      { status: 500 }
    );
  }
}
