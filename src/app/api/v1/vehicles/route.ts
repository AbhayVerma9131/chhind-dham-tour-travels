import { NextResponse } from "next/server";
import { getAllVehicles } from "@/server/services/vehicle.service";

export async function GET() {
  try {
    const vehicles = await getAllVehicles();
    return NextResponse.json({ success: true, data: vehicles });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to load vehicles" },
      { status: 500 }
    );
  }
}
