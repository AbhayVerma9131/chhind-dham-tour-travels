import Link from "next/link";
import { ShieldCheck, ArrowRight, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { formatINR, buildWhatsAppLink, getCarImageUrl } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Drive Car Rentals Bhopal",
  description:
    "Self-drive car hire in Bhopal with confirmed rates. Rent Mahindra Thar, XUV 700, Scorpio-N, Scorpio Classic, and Hyundai Verna from छिंद धाम TOUR TRAVELS.",
};

const SELF_DRIVE_TABLE = [
  { vehicle: "Mahindra Thar (4x4)", slug: "mahindra-thar", d6: 2000, d12: 3500, d24: 4200 },
  { vehicle: "Mahindra XUV 700 (Auto)", slug: "xuv-700", d6: null, d12: null, d24: 5500 },
  { vehicle: "Mahindra Scorpio-N", slug: "scorpio-n", d6: null, d12: null, d24: 5500 },
  { vehicle: "Mahindra Scorpio Classic", slug: "scorpio", d6: null, d12: null, d24: 5000 },
  { vehicle: "Hyundai Verna (Executive)", slug: "verna", d6: null, d12: null, d24: 5000 },
];

export default function SelfDrivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Transparent Self-Drive Tariffs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Self-Drive Car Rentals in Bhopal
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Experience total freedom on the road with our well-maintained self-drive fleet. Below is our verified tariff schedule for confirmed models and durations.
        </p>
      </div>

      {/* Pricing Table with Travel Vehicle Photos */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Vehicle</th>
                <th className="px-6 py-4 font-semibold text-center">6 Hours</th>
                <th className="px-6 py-4 font-semibold text-center">12 Hours</th>
                <th className="px-6 py-4 font-semibold text-center">24 Hours (Full Day)</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SELF_DRIVE_TABLE.map((row) => (
                <tr key={row.slug} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <Link
                      href={`/cars/${row.slug}`}
                      className="flex items-center gap-3.5 group-hover:text-blue-600 transition-colors"
                    >
                      <div className="w-14 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-xs">
                        <img
                          src={getCarImageUrl(row.slug)}
                          alt={row.vehicle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-600">
                        {row.vehicle}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={row.d6 ? "font-bold text-emerald-700" : "text-xs text-slate-400 italic"}>
                      {formatINR(row.d6)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={row.d12 ? "font-bold text-emerald-700" : "text-xs text-slate-400 italic"}>
                      {formatINR(row.d12)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={row.d24 ? "font-bold text-emerald-700 text-base" : "text-xs text-slate-400 italic"}>
                      {formatINR(row.d24)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/booking?type=SELF_DRIVE&vehicle=${row.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparent Policy Notice Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-blue-600" />
          <span>Self-Drive Booking Guidelines &amp; Operational Policies</span>
        </div>
        <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
          <p>
            • <strong>Unpriced Durations:</strong> Any slot marked &ldquo;Contact for Price&rdquo; will be quoted directly by our operations team based on your travel dates.
          </p>
          <p>
            • <strong>Documentation:</strong> Valid government identity proof and original driving license are verified prior to vehicle handover.
          </p>
          <p>
            • <strong>Security Deposit &amp; Fuel Policy:</strong> Security deposit amounts, free kilometre allowances, and fuel policies are confirmed upon enquiry prior to deposit payment.
          </p>
        </div>
      </div>

      {/* Direct Help CTAs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Need a custom rental duration?</h3>
          <p className="text-xs text-slate-600">Speak directly with Karan Kushwaha or Akash Ahirwar.</p>
        </div>
        <div className="flex gap-3">
          <a
            href="tel:9691345722"
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm text-xs font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>9691345722</span>
          </a>
          <a
            href={buildWhatsAppLink("9691345722", "Hello, I want to rent a self-drive car.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
