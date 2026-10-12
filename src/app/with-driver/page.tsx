import Link from "next/link";
import { ShieldCheck, ArrowRight, Phone, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chauffeur-Driven Car Rental Bhopal",
  description:
    "Professional chauffeur-driven car rentals in Bhopal with verified per-km rates: ₹11/km for 5-seaters and ₹13/km for 7-seaters. Driver included.",
};

export default function WithDriverPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-xs font-semibold text-purple-700">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>Professional Chauffeur Service</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Chauffeur-Driven Car Hire in Bhopal
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Travel in comfort with our verified driver network. Ideal for local meetings, outstation round-trips, and family pilgrimages across Madhya Pradesh.
        </p>
      </div>

      {/* 2 Verified Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 5-Seater Rate Card */}
        <div className="rounded-3xl border border-blue-200 bg-white p-8 space-y-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
              Verified 5-Seater Category
            </span>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-slate-900">
                ₹11 <span className="text-sm font-normal text-slate-500">/ kilometre</span>
              </div>
              <p className="text-xs text-blue-700 font-medium">Includes dedicated commercial driver</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ideal for solo executives, couples, and small families traveling for business, airport transfers, or outstation visits.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="font-semibold text-slate-900">Applicable Vehicles:</div>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Maruti Suzuki Dzire (Sedan)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Hyundai Aura (Compact Sedan)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Hyundai Verna (Executive Sedan)</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/booking?type=CHAUFFEUR&category=5"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center transition-colors shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span>Book 5-Seater Chauffeur</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 7-Seater Rate Card */}
        <div className="rounded-3xl border border-purple-200 bg-white p-8 space-y-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200">
              Verified 7-Seater Category
            </span>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-slate-900">
                ₹13 <span className="text-sm font-normal text-slate-500">/ kilometre</span>
              </div>
              <p className="text-xs text-purple-700 font-medium">Includes dedicated commercial driver</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ample legroom and boot space for families, group pilgrimages, and extended luggage journeys.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="font-semibold text-slate-900">Applicable Vehicles:</div>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                  <span>Maruti Suzuki Ertiga (Comfort MUV)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                  <span>Mahindra Scorpio &amp; Scorpio-N (SUV)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                  <span>Mahindra XUV 700 (Premium SUV)</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/booking?type=CHAUFFEUR&category=7"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs text-center transition-colors shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span>Book 7-Seater Chauffeur</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Guidelines Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
          <span>Outstation Terms &amp; Calculation Guidelines</span>
        </div>
        <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
          <p>
            • <strong>Driver Charges:</strong> Commercial driver compensation is covered within the ₹11/km and ₹13/km base tariffs.
          </p>
          <p>
            • <strong>Tolls &amp; Parking:</strong> Fastag toll taxes, state border entry taxes, and parking fees are charged as per actual receipts.
          </p>
          <p>
            • <strong>Minimum Billing &amp; Night Allowance:</strong> Any minimum daily distance threshold or night driving allowance is confirmed upon enquiry based on the route itinerary.
          </p>
        </div>
      </div>
    </div>
  );
}
