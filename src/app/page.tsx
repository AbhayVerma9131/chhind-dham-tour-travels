import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  ArrowRight,
  Car,
  Compass,
  CheckCircle,
  Clock,
  Sparkles,
  HelpCircle,
  MapPin,
  Users,
  Settings2,
} from "lucide-react";
import { QuickEnquiryForm } from "@/components/booking/QuickEnquiryForm";
import { getAllVehicles } from "@/server/services/vehicle.service";
import { getAllTourPackages } from "@/server/services/package.service";
import { formatINR, buildWhatsAppLink, getCarImageUrl } from "@/lib/utils";

export default async function HomePage() {
  const [vehicles, packages] = await Promise.all([
    getAllVehicles(),
    getAllTourPackages(),
  ]);

  const featuredVehicles = vehicles.filter((v) => v.isFeatured).slice(0, 4);

  return (
    <div className="flex flex-col space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[300px] bg-purple-500/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Bhopal&apos;s Verified Car Rental &amp; Tour Travel Partner</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Rent With Confidence.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-1">
                  छिंद धाम TOUR TRAVELS
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Self-drive rentals, verified chauffeur-driven outstation journeys, and sacred pilgrimage tours across Madhya Pradesh. Based in Bhanpur, Bhopal.
              </p>

              {/* Verified Rate Highlights Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="text-[11px] text-slate-500 font-semibold">5-Seater Driver Rate</div>
                  <div className="text-base font-bold text-blue-600">₹11 / km</div>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="text-[11px] text-slate-500 font-semibold">7-Seater Driver Rate</div>
                  <div className="text-base font-bold text-purple-600">₹13 / km</div>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-slate-500 font-semibold">Thar Self-Drive</div>
                  <div className="text-base font-bold text-emerald-600">From ₹2,000</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/booking"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2"
                >
                  <span>Book Now / Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:9691345722"
                  className="px-5 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm shadow-sm transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call 9691345722</span>
                </a>
              </div>
            </div>

            {/* Hero Right Quick Enquiry Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Quick Trip Enquiry</h3>
                    <p className="text-xs text-slate-500">Get availability &amp; rates on call</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
                    Fast Response
                  </span>
                </div>
                <QuickEnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Fleet Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              <Car className="w-4 h-4" />
              <span>Fleet Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured Rental Vehicles
            </h2>
          </div>
          <Link
            href="/cars"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <span>View All Vehicles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((car) => {
            const photoUrl = getCarImageUrl(car.slug, car.images?.[0]?.imageUrl);

            return (
              <div
                key={car.slug}
                className="rounded-3xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-blue-300 hover:shadow-xl shadow-sm transition-all group"
              >
                {/* Car Photo Banner */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={photoUrl}
                    alt={`${car.name} - छिंद धाम TOUR TRAVELS Bhopal`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
                      {car.category || "Vehicle"}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 text-white z-10">
                    <span className="text-[10px] uppercase font-bold text-blue-200 block">
                      {car.brand}
                    </span>
                    <h3 className="text-sm font-bold text-white drop-shadow">
                      {car.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[9px] text-slate-500 block">Seats</span>
                        <span className="font-semibold text-slate-800 text-xs">
                          {car.seatingCapacity ? `${car.seatingCapacity} Seater` : "On Request"}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[9px] text-slate-500 block">Gearbox</span>
                        <span className="font-semibold text-slate-800 text-xs truncate block">
                          {car.transmission || "Manual"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/cars/${car.slug}`}
                      className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      View Details &rarr;
                    </Link>
                    <Link
                      href={`/booking?vehicle=${car.slug}`}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Confirmed Pricing Highlights (Self-Drive & Driver) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Self-Drive Tariff Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
                  Self-Drive Rates
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Confirmed Self-Drive Tariffs</h3>
              </div>
              <Link
                href="/self-drive"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Full Table &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Mahindra Thar</div>
                  <div className="text-xs text-slate-500">6 Hours Slot</div>
                </div>
                <div className="font-bold text-emerald-700">₹2,000</div>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Mahindra Thar</div>
                  <div className="text-xs text-slate-500">12 Hours Slot</div>
                </div>
                <div className="font-bold text-emerald-700">₹3,500</div>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Mahindra Thar</div>
                  <div className="text-xs text-slate-500">24 Hours Slot</div>
                </div>
                <div className="font-bold text-emerald-700">₹4,200</div>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Mahindra XUV 700 / Scorpio-N</div>
                  <div className="text-xs text-slate-500">24 Hours Slot</div>
                </div>
                <div className="font-bold text-emerald-700">₹5,500</div>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Mahindra Scorpio / Hyundai Verna</div>
                  <div className="text-xs text-slate-500">24 Hours Slot</div>
                </div>
                <div className="font-bold text-emerald-700">₹5,000</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              * Rates shown are verified base hire prices. Fuel, security deposit, and km allowances are confirmed upon booking enquiry.
            </p>
          </div>

          {/* Chauffeur-Driven Rates Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider block">
                    With Driver (Chauffeur)
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Per-Kilometre Rates</h3>
                </div>
                <Link
                  href="/with-driver"
                  className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                >
                  Details &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/60 space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                    5-Seater Category
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900">₹11 <span className="text-xs font-normal text-slate-500">/ km</span></div>
                  <p className="text-xs text-slate-600">
                    Verified rate for sedans &amp; compact cars including professional driver. (Dzire, Aura, Verna).
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/60 space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-800">
                    7-Seater Category
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900">₹13 <span className="text-xs font-normal text-slate-500">/ km</span></div>
                  <p className="text-xs text-slate-600">
                    Verified rate for spacious SUVs &amp; MUVs including professional driver. (Ertiga, Scorpio, Scorpio-N, XUV 700).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Trip Inclusions &amp; Guidelines:</div>
                <p>• Driver charges are included in the per-km tariff.</p>
                <p>• Minimum km requirements, toll taxes, parking fees, and interstate permits are calculated based on your itinerary.</p>
              </div>
            </div>

            <Link
              href="/booking?type=CHAUFFEUR"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs text-center transition-colors shadow-sm"
            >
              Enquire Chauffeur Travel
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Pilgrimage & Tour Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Sacred Routes &amp; Tours</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pilgrimage Tour Packages
            </h2>
          </div>
          <Link
            href="/tour-packages"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg shadow-sm transition-all space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">From {pkg.origin}</span>
                  <span className="font-bold text-emerald-700 text-base">
                    {formatINR(Number(pkg.basePrice))}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{pkg.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pkg.description}
                </p>
                {pkg.vehicleModel && (
                  <div className="text-[11px] text-blue-600 font-medium">
                    Vehicle: {pkg.vehicleModel}
                  </div>
                )}
                {pkg.inclusionsNotes && (
                  <p className="text-[10px] text-slate-500 italic">
                    Note: {pkg.inclusionsNotes}
                  </p>
                )}
              </div>

              <Link
                href={`/booking?package=${pkg.slug}`}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs text-center transition-all shadow-sm"
              >
                Book Package Enquiry
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us (Factual, Confirmed Claims Only) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
            Authentic Service
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Travel With छिंद धाम
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No hidden pricing tricks or unverified promises. We deliver straightforward, reliable rental solutions in Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Fleet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Well-maintained vehicles including Thar, XUV 700, Scorpio-N, Ertiga, and Verna ready for city and highway transit.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Transparent Tariffs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear per-kilometre chauffeur rates (₹11/km and ₹13/km) and fixed duration self-drive slabs. No fictitious pricing.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Pilgrimage Expertise</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated packages for Maihar Sharda Maa and Bagalamukhi Dham with experienced drivers accustomed to pilgrimage routes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direct Owner Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak directly with business owners Karan Kushwaha and Akash Ahirwar for immediate support and coordination.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Booking Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How The Booking Enquiry Works</h2>
            <p className="text-xs text-slate-500 mt-1">
              Transparent, confirmed steps from request to vehicle dispatch
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600">STEP 1</span>
              <h4 className="font-semibold text-slate-900 text-sm">Submit Enquiry</h4>
              <p className="text-xs text-slate-600">Choose your rental mode, preferred car, dates, and destination.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600">STEP 2</span>
              <h4 className="font-semibold text-slate-900 text-sm">Reference Assigned</h4>
              <p className="text-xs text-slate-600">Receive your unique tracking reference number (CDT-XXXX).</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600">STEP 3</span>
              <h4 className="font-semibold text-slate-900 text-sm">Availability Check</h4>
              <p className="text-xs text-slate-600">Our admin verifies vehicle readiness, route terms, and contacts you.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-600">STEP 4</span>
              <h4 className="font-semibold text-slate-900 text-sm">Confirmed Booking</h4>
              <p className="text-xs text-slate-600">Status is updated to CONFIRMED. Car is prepared for pickup or dispatch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WhatsApp / Direct Call Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-purple-50 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Ready to Plan Your Journey in Bhopal?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Contact us directly on WhatsApp or call our team for instant quotes, emergency outstation trips, or customized pilgrimage arrangements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={buildWhatsAppLink("9691345722", "Hello छिंद धाम TOUR TRAVELS, I want to book a car.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              WhatsApp Karan (9691345722)
            </a>
            <a
              href="tel:7400950207"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs shadow-sm transition-all"
            >
              Call Akash (7400950207)
            </a>
            <Link
              href="/booking"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              Online Booking Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
