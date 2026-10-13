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
  MapPin,
  Sparkles,
} from "lucide-react";
import { formatINR, buildWhatsAppLink, getCarImageUrl } from "@/lib/utils";
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
    title: `${vehicle.name} Rental Bhopal | छिंद धाम TOUR TRAVELS`,
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
  const photoUrl = getCarImageUrl(vehicle.slug, vehicle.images?.[0]?.imageUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Banner + Specs + Tour Features */}
        <div className="lg:col-span-7 space-y-8">
          {/* Hero Tour Vehicle Image */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-lg group">
            <div className="h-72 sm:h-96 w-full overflow-hidden">
              <img
                src={photoUrl}
                alt={`${vehicle.name} - छिंद धाम TOUR TRAVELS Bhopal`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Badges on Hero Image */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/90 text-white backdrop-blur-md shadow">
                {vehicle.brand}
              </span>
              {vehicle.category && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 backdrop-blur-md shadow">
                  {vehicle.category}
                </span>
              )}
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs text-blue-200 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" /> Bhopal, Madhya Pradesh Hub
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-md">
                  {vehicle.name}
                </h1>
              </div>
              <div className="flex gap-2">
                {hasSelfDrive && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                    Self-Drive
                  </span>
                )}
                {hasChauffeur && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                    With Driver
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Vehicle & Tour Overview</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
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
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-md sticky top-28">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Rental Tariff Summary</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Available in Bhopal
              </span>
            </div>

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
              Booking requests are handled promptly by our Bhopal operations desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
