import { notFound } from "next/navigation";
import Link from "next/link";
import { getVehicleBySlug } from "@/server/services/vehicle.service";
import {
  getChauffeurRateForSeats,
  lookupSelfDrivePrice,
} from "@/server/services/pricing.service";
import {
  Users,
  Settings2,
  Fuel,
  ShieldCheck,
  Phone,
  ArrowRight,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { formatINR, buildWhatsAppLink } from "@/lib/utils";
import { Metadata } from "next";

interface VehiclePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) return { title: "Vehicle Not Found" };
  return {
    title: `${vehicle.name} Rental Bhopal`,
    description: `Rent ${vehicle.name} in Bhopal. Self-drive and chauffeur rentals by छिंद धाम TOUR TRAVELS.`,
  };
}

export default async function VehicleDetailsPage({ params }: VehiclePageProps) {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    notFound();
  }

  const chauffeurRate = getChauffeurRateForSeats(vehicle.seatingCapacity);
  const selfDrive6h = lookupSelfDrivePrice(vehicle.slug, 6);
  const selfDrive12h = lookupSelfDrivePrice(vehicle.slug, 12);
  const selfDrive24h = lookupSelfDrivePrice(vehicle.slug, 24);

  const hasSelfDrive = vehicle.supportedModes.includes("SELF_DRIVE");
  const hasChauffeur = vehicle.supportedModes.includes("CHAUFFEUR");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/cars" className="hover:text-slate-900 transition-colors">
          Fleet
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{vehicle.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Specification Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {vehicle.brand}
              </span>
              {vehicle.category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  {vehicle.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              {vehicle.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              {vehicle.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Verified Specifications</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Seating Capacity</span>
                <span className="font-bold text-sm text-slate-900">
                  {vehicle.seatingCapacity ? `${vehicle.seatingCapacity} Persons` : "Contact for details"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Transmission</span>
                <span className="font-bold text-sm text-slate-900">
                  {vehicle.transmission || "Contact for details"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Fuel Type</span>
                <span className="font-bold text-sm text-slate-900">
                  {vehicle.fuelType || "Contact for details"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Model Code</span>
                <span className="font-bold text-sm text-slate-900">
                  {vehicle.model || "Standard"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Location</span>
                <span className="font-bold text-sm text-slate-900">
                  Bhopal, MP
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Handover Inspection</span>
                <span className="font-bold text-sm text-emerald-700">
                  Included
                </span>
              </div>
            </div>
          </div>

          {/* Chauffeur Rate Card if supported */}
          {hasChauffeur && (
            <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-6 space-y-3 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                Chauffeur-Driven Travel Option
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {chauffeurRate ? `₹${chauffeurRate.ratePerKm}` : "Contact"}
                </span>
                <span className="text-xs text-slate-600">/ kilometre (driver included)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {chauffeurRate?.notes || "Driver rate subject to route confirmation."}
              </p>
            </div>
          )}
        </div>

        {/* Right Tariff & Booking CTA Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-900">Rental Pricing Summary</h3>

            {hasSelfDrive && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Self-Drive Rates
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">6 Hours Slot:</span>
                    <span className="font-bold text-emerald-700">{formatINR(selfDrive6h)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">12 Hours Slot:</span>
                    <span className="font-bold text-emerald-700">{formatINR(selfDrive12h)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">24 Hours (Full Day):</span>
                    <span className="font-bold text-emerald-700">{formatINR(selfDrive24h)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-3">
              <Link
                href={`/booking?vehicle=${vehicle.slug}`}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs text-center transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <span>Submit Booking Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={buildWhatsAppLink("9691345722", `Hello छिंद धाम TOUR TRAVELS, I am interested in renting ${vehicle.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href="tel:9691345722"
                className="w-full py-3 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 font-semibold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Karan (9691345722)</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Booking requests are subject to admin availability verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
