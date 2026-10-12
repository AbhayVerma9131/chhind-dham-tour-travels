"use client";

import { useState } from "react";
import { Download, Search, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { BookingStatus } from "@/server/validators/booking.schema";

interface BookingRecord {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  rentalType: string;
  vehicleName: string | null;
  packageName: string | null;
  pickupDate: string;
  returnDate: string | null;
  pickupLocation: string;
  status: BookingStatus;
  adminNotes: string | null;
  createdAt: string;
}

const STATUS_OPTIONS: BookingStatus[] = [
  "PENDING",
  "CONTACTED",
  "CONFIRMED",
  "REJECTED",
  "CANCELLED",
  "COMPLETED",
];

export function BookingManagerClient({ initialBookings }: { initialBookings: BookingRecord[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = selectedStatus === "ALL" || b.status === selectedStatus;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      b.referenceNumber.toLowerCase().includes(term) ||
      b.customerName.toLowerCase().includes(term) ||
      b.customerPhone.includes(term);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus, notes?: string) => {
    setUpdatingId(bookingId);
    setNotice(null);

    try {
      const res = await fetch(`/api/v1/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes: notes }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus, adminNotes: notes || b.adminNotes } : b))
        );
        setNotice({ message: data.message, type: "success" });
      } else {
        setNotice({ message: data.message || "Failed to update status.", type: "error" });
      }
    } catch {
      setNotice({ message: "Network error occurred.", type: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reference, name, phone..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium"
          >
            <option value="ALL">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <a
          href="/api/v1/admin/bookings/export"
          download
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/90 font-semibold text-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>Export CSV</span>
        </a>
      </div>

      {notice && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            notice.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {notice.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />}
          <span>{notice.message}</span>
        </div>
      )}

      {/* Bookings Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Rental Type</th>
                <th className="py-3 px-4">Vehicle / Package</th>
                <th className="py-3 px-4">Travel Dates</th>
                <th className="py-3 px-4">Status &amp; Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No matching booking requests found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-blue-600">
                      {b.referenceNumber}
                      <span className="block text-[10px] text-slate-500 font-sans font-normal pt-0.5">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-900">{b.customerName}</div>
                      <div className="text-slate-600">{b.customerPhone}</div>
                      {b.customerEmail && <div className="text-[10px] text-slate-500">{b.customerEmail}</div>}
                    </td>
                    <td className="py-4 px-4 text-slate-600">{b.rentalType}</td>
                    <td className="py-4 px-4 text-slate-900 font-medium">
                      {b.vehicleName || b.packageName || "Not specified"}
                      <span className="block text-[10px] text-slate-500 font-normal">
                        Pickup: {b.pickupLocation}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {b.pickupDate.slice(0, 10)}
                      {b.returnDate && ` to ${b.returnDate.slice(0, 10)}`}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={b.status}
                          disabled={updatingId === b.id}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:outline-none focus:border-blue-600 disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        {updatingId === b.id && <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
