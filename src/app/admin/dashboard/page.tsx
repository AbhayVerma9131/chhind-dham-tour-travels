import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Car,
  Compass,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Load metrics from DB with fallback
  let totalBookings = 0;
  let pendingCount = 0;
  let contactedCount = 0;
  let confirmedCount = 0;
  let recentBookings: any[] = [];

  try {
    const [total, pending, contacted, confirmed, recent] = await Promise.all([
      prisma.bookingRequest.count(),
      prisma.bookingRequest.count({ where: { status: "PENDING" } }),
      prisma.bookingRequest.count({ where: { status: "CONTACTED" } }),
      prisma.bookingRequest.count({ where: { status: "CONFIRMED" } }),
      prisma.bookingRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { vehicle: true, tourPackage: true },
      }),
    ]);
    totalBookings = total;
    pendingCount = pending;
    contactedCount = contacted;
    confirmedCount = confirmed;
    recentBookings = recent;
  } catch (err) {
    // Database offline mode fallback metrics
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Operations Dashboard
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Real-time overview of customer booking requests and fleet status.
          </p>
        </div>

        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all self-start sm:self-auto"
        >
          <span>View All Enquiries</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Enquiries</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalBookings}</div>
          <div className="text-[11px] text-slate-500">All-time customer requests</div>
        </div>

        <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/70 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-800 font-semibold">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-700">{pendingCount}</div>
          <div className="text-[11px] text-amber-800/80">Awaiting availability check</div>
        </div>

        <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/70 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-blue-800 font-semibold">
            <span>Contacted</span>
            <AlertCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-700">{contactedCount}</div>
          <div className="text-[11px] text-blue-800/80">In customer dialogue</div>
        </div>

        <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold">
            <span>Confirmed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{confirmedCount}</div>
          <div className="text-[11px] text-emerald-800/80">Approved and scheduled</div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/bookings"
          className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-md transition-all shadow-sm space-y-3 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Booking Workflow</h3>
          <p className="text-xs text-slate-600">
            Filter, search, update status, and export enquiries to CSV.
          </p>
        </Link>

        <Link
          href="/admin/vehicles"
          className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-purple-300 hover:shadow-md transition-all shadow-sm space-y-3 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Vehicle Inventory</h3>
          <p className="text-xs text-slate-600">
            Inspect specifications and toggle active/featured fleet models.
          </p>
        </Link>

        <Link
          href="/admin/packages"
          className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-300 hover:shadow-md transition-all shadow-sm space-y-3 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Tour Packages</h3>
          <p className="text-xs text-slate-600">
            Manage pilgrimage tariffs, route destinations, and inclusions.
          </p>
        </Link>
      </div>

      {/* Recent Enquiries Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Recent Customer Enquiries</h3>
          <Link href="/admin/bookings" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            Manage All
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
            No booking enquiries recorded in database yet. New enquiries will appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-slate-600 uppercase">
                <tr>
                  <th className="py-3 px-4">Ref</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Rental Type</th>
                  <th className="py-3 px-4">Pickup Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">{b.referenceNumber}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{b.customerName}</td>
                    <td className="py-3 px-4 text-slate-600">{b.customerPhone}</td>
                    <td className="py-3 px-4 text-slate-500">{b.rentalType}</td>
                    <td className="py-3 px-4 text-slate-500">{b.pickupDate.toISOString().slice(0, 10)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
