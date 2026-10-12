"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Car, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export function QuickEnquiryForm() {
  const router = useRouter();
  const [rentalType, setRentalType] = useState<"SELF_DRIVE" | "CHAUFFEUR" | "TOUR_PACKAGE">("SELF_DRIVE");
  const [pickupDate, setPickupDate] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("Please enter your name");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    if (!pickupDate) {
      setErrorMsg("Please select a travel / pickup date");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerPhone: phone.trim(),
          rentalType,
          pickupDate: new Date(pickupDate).toISOString(),
          pickupLocation: "Bhopal (Confirmed on call)",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessRef(data.referenceNumber);
      } else {
        setErrorMsg(data.message || "Failed to submit enquiry. Please call us directly.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please call us directly at 9691345722.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successRef) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center space-y-3 shadow-sm">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Booking Enquiry Received!</h3>
        <p className="text-xs text-slate-700">
          Your enquiry reference is <span className="font-mono text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">{successRef}</span>.
        </p>
        <p className="text-xs text-slate-600">
          Status is <span className="text-amber-800 font-semibold bg-amber-100/80 px-2 py-0.5 rounded">PENDING ADMIN CONFIRMATION</span>. Our team will verify vehicle availability and call you shortly.
        </p>
        <button
          onClick={() => {
            setSuccessRef(null);
            setName("");
            setPhone("");
            setPickupDate("");
          }}
          className="text-xs text-blue-600 font-medium underline pt-2 hover:text-blue-800"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rental Type Selector Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setRentalType("SELF_DRIVE")}
          className={`py-2 rounded-lg transition-all ${
            rentalType === "SELF_DRIVE"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Self-Drive
        </button>
        <button
          type="button"
          onClick={() => setRentalType("CHAUFFEUR")}
          className={`py-2 rounded-lg transition-all ${
            rentalType === "CHAUFFEUR"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          With Driver
        </button>
        <button
          type="button"
          onClick={() => setRentalType("TOUR_PACKAGE")}
          className={`py-2 rounded-lg transition-all ${
            rentalType === "TOUR_PACKAGE"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Tour Package
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Karan"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">10-Digit Mobile</label>
          <input
            type="tel"
            required
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="9691345722"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Date</label>
          <input
            type="date"
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-slate-500">
          Instant enquiry acknowledgement. Admin verifies before confirming.
        </span>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
        >
          <span>{isSubmitting ? "Submitting..." : "Send Request"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
