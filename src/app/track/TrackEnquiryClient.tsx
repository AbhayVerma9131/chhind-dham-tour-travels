"use client";

import { useState } from "react";
import { Search, ShieldAlert, CheckCircle2, Clock, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

interface TrackedBooking {
  referenceNumber: string;
  customerName: string;
  customerPhone: string;
  rentalType: string;
  vehicleOrPackage: string;
  pickupDate: string;
  returnDate: string | null;
  pickupLocation: string;
  status: string;
  createdAt: string;
}

export function TrackEnquiryClient() {
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackedBooking | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    setErrorMsg(null);
    setResult(null);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/v1/bookings/lookup?ref=${encodeURIComponent(reference.trim().toUpperCase())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        setErrorMsg(data.message || "Enquiry reference not found. Please check and try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try again or call us.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          icon: <Clock className="w-4 h-4 text-amber-600" />,
          label: "PENDING VERIFICATION",
          style: "bg-amber-50 text-amber-800 border-amber-200",
          desc: "Our team has received your enquiry and is verifying vehicle availability.",
        };
      case "CONTACTED":
        return {
          icon: <AlertCircle className="w-4 h-4 text-blue-600" />,
          label: "CONTACTED / IN DIALOGUE",
          style: "bg-blue-50 text-blue-800 border-blue-200",
          desc: "Our operations manager is in touch with you regarding trip terms.",
        };
      case "CONFIRMED":
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          label: "CONFIRMED RESERVATION",
          style: "bg-emerald-50 text-emerald-800 border-emerald-200",
          desc: "Your booking is confirmed! Vehicle is reserved for your trip.",
        };
      case "COMPLETED":
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-slate-600" />,
          label: "COMPLETED",
          style: "bg-slate-100 text-slate-800 border-slate-200",
          desc: "Trip successfully concluded. Thank you for choosing छिंद धाम TOUR TRAVELS.",
        };
      case "CANCELLED":
      case "REJECTED":
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-600" />,
          label: status,
          style: "bg-red-50 text-red-800 border-red-200",
          desc: "This request is cancelled. Please call us to reschedule or select alternative dates.",
        };
      default:
        return {
          icon: <Clock className="w-4 h-4 text-slate-500" />,
          label: status,
          style: "bg-slate-100 text-slate-800 border-slate-200",
          desc: "Current booking status.",
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input Card */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            required
            value={reference}
            onChange={(e) => setReference(e.target.value.toUpperCase())}
            placeholder="e.g. CDT-20261013-XXXX"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 uppercase transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all shrink-0 disabled:opacity-50"
        >
          {isLoading ? "Checking..." : "Track Status"}
        </button>
      </form>

      {errorMsg && (
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Enquiry Reference</span>
              <div className="text-xl font-mono font-extrabold text-blue-600">
                {result.referenceNumber}
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase inline-flex items-center gap-1.5 ${getStatusBadge(result.status).style}`}>
              {getStatusBadge(result.status).icon}
              <span>{getStatusBadge(result.status).label}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            {getStatusBadge(result.status).desc}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-semibold">Customer Name</span>
              <div className="font-bold text-slate-900 text-sm">{result.customerName}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-semibold">Service Type</span>
              <div className="font-bold text-slate-900 text-sm">{result.rentalType}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-semibold">Vehicle / Package</span>
              <div className="font-bold text-slate-900 text-sm">{result.vehicleOrPackage}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-semibold">Pickup Date</span>
              <div className="font-bold text-slate-900 text-sm">{result.pickupDate}</div>
            </div>
          </div>

          {/* Contact Support with Ref */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
            <span className="text-xs text-slate-500">Need immediate update?</span>
            <div className="flex gap-2 w-full sm:w-auto">
              <a
                href="tel:9691345722"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call 9691345722</span>
              </a>
              <a
                href={buildWhatsAppLink("9691345722", `Hello, regarding booking enquiry ${result.referenceNumber}...`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
