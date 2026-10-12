import Link from "next/link";
import { getAllTourPackages } from "@/server/services/package.service";
import { Compass, MapPin, ArrowRight, ShieldCheck, Phone } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilgrimage Tour Packages from Bhopal",
  description:
    "Curated pilgrimage travel packages from Bhopal: Maa Sharda Maihar Darshan, Maa Bagalamukhi Dham (Nalkheda), and festive Navratri tours.",
};

export default async function TourPackagesPage() {
  const packages = await getAllTourPackages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-xs font-semibold text-purple-700">
          <Compass className="w-4 h-4 text-purple-600" />
          <span>Sacred Routes &amp; Pilgrimages</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Tour &amp; Pilgrimage Packages from Bhopal
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Travel comfortably on sacred pilgrimage circuits across Madhya Pradesh. Rates shown are confirmed base tariffs with detailed terms verified on enquiry.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.slug}
            className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg shadow-sm transition-all space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>From {pkg.origin}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-sm">
                  {formatINR(Number(pkg.basePrice))}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{pkg.title}</h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {pkg.description}
              </p>

              {pkg.vehicleModel && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-blue-700 font-medium">
                  Assigned Vehicle: <span className="text-slate-900 font-semibold">{pkg.vehicleModel}</span>
                </div>
              )}

              {pkg.inclusionsNotes && (
                <p className="text-[11px] text-amber-800 italic">
                  * Note: {pkg.inclusionsNotes}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href={`/tour-packages/${pkg.slug}`}
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
              >
                Full Details &rarr;
              </Link>
              <Link
                href={`/booking?type=TOUR_PACKAGE&package=${pkg.slug}`}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all inline-flex items-center gap-1.5"
              >
                <span>Enquire Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
