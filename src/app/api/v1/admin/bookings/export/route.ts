import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const bookings = await prisma.bookingRequest.findMany({
      include: { vehicle: true, tourPackage: true },
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Reference",
      "Customer Name",
      "Phone",
      "Email",
      "Rental Type",
      "Vehicle / Package",
      "Pickup Date",
      "Return Date",
      "Pickup Location",
      "Status",
      "Created At",
    ];

    const escapeCsv = (val: unknown) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = bookings.map((b) => [
      escapeCsv(b.referenceNumber),
      escapeCsv(b.customerName),
      escapeCsv(b.customerPhone),
      escapeCsv(b.customerEmail || ""),
      escapeCsv(b.rentalType),
      escapeCsv(b.vehicle?.name || b.tourPackage?.title || ""),
      escapeCsv(b.pickupDate.toISOString().slice(0, 10)),
      escapeCsv(b.returnDate ? b.returnDate.toISOString().slice(0, 10) : ""),
      escapeCsv(b.pickupLocation),
      escapeCsv(b.status),
      escapeCsv(b.createdAt.toISOString()),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="chhind-dham-bookings.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Export failed." },
      { status: 500 }
    );
  }
}
