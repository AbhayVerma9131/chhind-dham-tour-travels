import Link from "next/link";
import { getAllVehicles } from "@/server/services/vehicle.service";
import { Car, Users, Fuel, Settings2, ShieldCheck, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rental Fleet & Vehicle Catalogue",
  description:
    "Explore verified self-drive and chauffeur vehicles in Bhopal: Mahindra Thar, XUV 700, Scorpio-N, Ertiga, Verna, Dzire, Aura, and more.",
};

export default async function CarsPage() {
  const vehicles = await getAllVehicles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Bhopal Verified Fleet</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Our Vehicle Fleet
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Complete verified catalogue of 9 vehicle models available for self-drive hire and chauffeur travel in Bhopal. Specifications reflect verified manufacturer criteria.
        </p>
      </div>

      {/* Grid of 9 Vehicles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((car) => {
          const isSelfDriveSupported = car.supportedModes.includes("SELF_DRIVE");
          const isChauffeurSupported = car.supportedModes.includes("CHAUFFEUR");

          return (
            <div
              key={car.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg shadow-sm transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {car.brand}
                  </span>
                  <div className="flex gap-1.5">
                    {isSelfDriveSupported && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        Self-Drive
                      </span>
                    )}
                    {isChauffeurSupported && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        With Driver
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">{car.name}</h2>
                  {car.category && (
                    <span className="text-xs text-slate-500 font-medium">
                      {car.category}
                    </span>
                  )}
                </div>

                {/* Verified Specs Pill Matrix */}
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <Users className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block">Seats</span>
                    <span className="font-semibold text-xs text-slate-800">
                      {car.seatingCapacity ? `${car.seatingCapacity}` : "On Call"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <Settings2 className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block">Gearbox</span>
                    <span className="font-semibold text-[11px] truncate block text-slate-800">
                      {car.transmission || "Manual"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <Fuel className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block">Fuel</span>
                    <span className="font-semibold text-[11px] truncate block text-slate-800">
                      {car.fuelType || "Contact"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {car.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/cars/${car.slug}`}
                  className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  View Details &rarr;
                </Link>
                <Link
                  href={`/booking?vehicle=${car.slug}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <span>Book Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
