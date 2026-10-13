"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldAlert, Phone } from "lucide-react";

interface OptionItem {
  id: string;
  name: string;
}

interface FullBookingFormProps {
  vehicles: OptionItem[];
  packages: OptionItem[];
  initialRentalType?: "SELF_DRIVE" | "CHAUFFEUR" | "TOUR_PACKAGE";
  initialVehicleId?: string;
  initialPackageId?: string;
}

export function FullBookingForm({
  vehicles,
  packages,
  initialRentalType = "SELF_DRIVE",
  initialVehicleId = "",
  initialPackageId = "",
}: FullBookingFormProps) {
  const [rentalType, setRentalType] = useState(initialRentalType);
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicleId);
  const [selectedPackage, setSelectedPackage] = useState(initialPackageId);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [passengerCount, setPassengerCount] = useState("1");
  const [customerNotes, setCustomerNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceNumber: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }

    const cleanedPhone = phone.trim().replace(/[\s\-\+]/g, "").replace(/^(91|0)/, "");
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    if (!pickupDate) {
      setErrorMessage("Please select a pickup date");
      return;
    }

    if (!pickupLocation.trim()) {
      setErrorMessage("Please enter a pickup address or landmark in Bhopal");
      return;
    }

    if (rentalType === "TOUR_PACKAGE" && !selectedPackage) {
      setErrorMessage("Please select a tour package");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: Record<string, unknown> = {
        customerName: name.trim(),
        customerPhone: cleanedPhone,
        customerEmail: email.trim() || undefined,
        rentalType,
        pickupDate: new Date(pickupDate).toISOString(),
        returnDate: returnDate ? new Date(returnDate).toISOString() : undefined,
        pickupLocation: pickupLocation.trim(),
        dropLocation: dropLocation.trim() || undefined,
        passengerCount: parseInt(passengerCount, 10) || 1,
        customerNotes: customerNotes.trim() || undefined,
      };

      if (rentalType === "TOUR_PACKAGE") {
        payload.tourPackageId = selectedPackage;
      } else if (selectedVehicle) {
        payload.vehicleId = selectedVehicle;
      }

      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessData({ referenceNumber: data.referenceNumber });
      } else {
        setErrorMessage(data.message || "Failed to submit booking request.");
      }
    } catch (err) {
      setErrorMessage("Network issue. Please contact Karan (9691345722) or Akash (7400950207).");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Booking Enquiry Submitted</h2>
          <p className="text-sm text-slate-600">
            Thank you, <span className="font-semibold text-slate-900">{name}</span>. Your enquiry reference number is:
          </p>
          <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-lg font-bold text-emerald-700 tracking-wider shadow-inner">
            {successData.referenceNumber}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-left text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-blue-800">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span>Important Information</span>
          </div>
          <p>
            • This is an enquiry request and is <strong>not yet confirmed</strong>.
          </p>
          <p>
            • An administrator from <strong>छिंद धाम TOUR TRAVELS</strong> will verify vehicle availability and contact you on <strong>{phone}</strong> to confirm booking terms and vehicle handover.
          </p>
          <p>
            • For urgent confirmation, call us directly quoting reference <strong>{successData.referenceNumber}</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="tel:9691345722"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Call Karan (9691345722)</span>
          </a>
          <button
            onClick={() => {
              setSuccessData(null);
              setName("");
              setPhone("");
              setEmail("");
              setPickupDate("");
              setReturnDate("");
              setPickupLocation("");
              setDropLocation("");
              setCustomerNotes("");
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-sm"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg space-y-8">
      {/* Category Tabs */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          1. Select Rental Service Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setRentalType("SELF_DRIVE")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              rentalType === "SELF_DRIVE"
                ? "border-blue-600 bg-blue-50/80 text-slate-900 shadow-sm ring-1 ring-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <div className="font-bold text-sm text-slate-900">Self-Drive Rental</div>
            <div className="text-xs text-slate-500 mt-1">Drive yourself. Thar, XUV 700, Scorpio-N, Verna.</div>
          </button>

          <button
            type="button"
            onClick={() => setRentalType("CHAUFFEUR")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              rentalType === "CHAUFFEUR"
                ? "border-blue-600 bg-blue-50/80 text-slate-900 shadow-sm ring-1 ring-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <div className="font-bold text-sm text-slate-900">With Driver (Chauffeur)</div>
            <div className="text-xs text-slate-500 mt-1">5-Seater (₹11/km) &amp; 7-Seater (₹13/km) verified rates.</div>
          </button>

          <button
            type="button"
            onClick={() => setRentalType("TOUR_PACKAGE")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              rentalType === "TOUR_PACKAGE"
                ? "border-blue-600 bg-blue-50/80 text-slate-900 shadow-sm ring-1 ring-blue-600"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <div className="font-bold text-sm text-slate-900">Pilgrimage / Tour Package</div>
            <div className="text-xs text-slate-500 mt-1">Maihar Sharda Maa, Bagalamukhi Dham packages.</div>
          </button>
        </div>
      </div>

      {/* Vehicle or Package Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {rentalType === "TOUR_PACKAGE" ? (
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Tour Package *
            </label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            >
              <option value="">-- Choose a pilgrimage route --</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Preferred Vehicle (Optional)
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            >
              <option value="">-- Any suitable vehicle (We will suggest) --</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Dates & Passengers */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          2. Travel Schedule
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Date *</label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Passenger Count</label>
            <input
              type="number"
              min={1}
              max={15}
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Locations */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          3. Pickup &amp; Destination
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Location in Bhopal *</label>
            <input
              type="text"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="e.g. Bhanpur, Bhopal Station, MP Nagar"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Drop / Destination Location</label>
            <input
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              placeholder="e.g. Maihar, Indore, Ujjain, Local"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Customer Contact Details */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          4. Contact Details
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">10-Digit Mobile Number *</label>
            <input
              type="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="9876543210"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requests or Notes</label>
          <textarea
            rows={3}
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
            placeholder="Any specific requirement, luggage size, or travel preferences..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submission CTA */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          • Requests are entered with status <strong>PENDING</strong> and confirmed manually by admin.
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isSubmitting ? "Submitting Request..." : "Submit Booking Enquiry"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
