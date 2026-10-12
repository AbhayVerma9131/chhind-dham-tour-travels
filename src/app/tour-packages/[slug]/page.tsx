import { notFound } from "next/navigation";
import Link from "next/link";
import { getTourPackageBySlug } from "@/server/services/package.service";
import { Compass, MapPin, ArrowRight, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { formatINR, buildWhatsAppLink } from "@/lib/utils";
import { Metadata } from "next";

interface PackagePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const pkg = await getTourPackageBySlug(params.slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.title} | छिंद धाम TOUR TRAVELS`,
    description: pkg.description || "Pilgrimage tour package from Bhopal.",
  };
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const pkg = await getTourPackageBySlug(params.slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumbs */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/tour-packages" className="hover:text-slate-900 transition-colors">
          Tour Packages
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{pkg.title}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-purple-600" />
              <span>Sacred Pilgrimage Route</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              {pkg.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Origin: <strong className="text-slate-900">{pkg.origin}</strong></span>
              </span>
              <span>&rarr;</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>Destination: <strong className="text-slate-900">{pkg.destination}</strong></span>
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              {pkg.description}
            </p>
          </div>

          {/* Details Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base">Package Overview &amp; Route Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Standard Vehicle</span>
                <span className="font-bold text-slate-900">{pkg.vehicleModel || "Standard Group Carrier"}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Base Price</span>
                <span className="font-bold text-emerald-700 text-sm">{formatINR(Number(pkg.basePrice))}</span>
              </div>
            </div>

            {pkg.inclusionsNotes && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <p>Note: {pkg.inclusionsNotes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-md">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Base Package Rate</span>
              <div className="text-4xl font-black text-emerald-700 mt-1">
                {formatINR(Number(pkg.basePrice))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={`/booking?type=TOUR_PACKAGE&package=${pkg.slug}`}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs text-center transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <span>Book This Tour Package</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={buildWhatsAppLink("9691345722", `Hello छिंद धाम TOUR TRAVELS, I am interested in the ${pkg.title} package.`)}
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
              Custom pickup points across Bhopal available upon booking enquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
