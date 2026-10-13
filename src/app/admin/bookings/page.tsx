import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BookingManagerClient } from "./BookingManagerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminBookingsPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let formattedBookings: any[] = [];

  try {
    const raw = await prisma.bookingRequest.findMany({
      include: { vehicle: true, tourPackage: true },
      orderBy: { createdAt: "desc" },
    });

    formattedBookings = raw.map((b) => ({
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
  } catch {
    // Graceful fallback for pre-migration state
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Booking Enquiries &amp; Workflow
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, transition statuses, and confirm vehicle allocations for customer requests.
        </p>
      </div>

      <BookingManagerClient initialBookings={formattedBookings} />
    </div>
  );
}
