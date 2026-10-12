import { NextResponse } from "next/server";
import { getAllTourPackages } from "@/server/services/package.service";

export async function GET() {
  try {
    const packages = await getAllTourPackages();
    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to load tour packages" },
      { status: 500 }
    );
  }
}
