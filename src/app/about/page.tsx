import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Car, Compass, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | छिंद धाम TOUR TRAVELS",
  description:
    "Learn about छिंद धाम TOUR TRAVELS in Bhanpur, Bhopal. Dedicated to dependable self-drive car rentals, chauffeur-driven travel, and pilgrimage circuits across MP.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>About छिंद धाम TOUR TRAVELS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Your Trusted Travel &amp; Car Rental Partner in Bhopal
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Operating from Bhanpur, Bhopal, <strong>छिंद धाम TOUR TRAVELS</strong> provides dependable vehicle hire for self-drive enthusiasts, families traveling on pilgrimage, and corporate professionals requiring punctual chauffeur service.
        </p>
      </div>

      {/* Core Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
            <Car className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Quality Fleet</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From iconic 4x4 off-roaders like the Mahindra Thar to comfortable highway sedans (Verna) and spacious 7-seater carriers (XUV 700, Scorpio-N, Ertiga).
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Pilgrimage Dedication</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Specialized in devotional darshan routes from Bhopal to revered shrines like Maa Sharda Temple (Maihar) and Maa Bagalamukhi Dham (Nalkheda).
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Transparent Pricing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every booking request is processed with verified tariffs (₹11/km and ₹13/km chauffeur rates) with clear upfront terms and no deceptive add-ons.
          </p>
        </div>
      </div>

      {/* Leadership & Location */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Direct Owner Accountability</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            We believe personal attention makes all the difference in travel. You deal directly with our founders who oversee maintenance, scheduling, and driver discipline.
          </p>
          <div className="pt-2 space-y-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Karan Kushwaha</div>
                <div className="text-[11px] text-slate-500">Owner &amp; Operations</div>
              </div>
              <a href="tel:9691345722" className="text-blue-600 font-semibold hover:underline">
                9691345722
              </a>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Akash Ahirwar</div>
                <div className="text-[11px] text-slate-500">Co-founder &amp; Fleet Management</div>
              </div>
              <a href="tel:7400950207" className="text-blue-600 font-semibold hover:underline">
                7400950207
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-blue-700 font-semibold">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Operating Location</span>
          </div>
          <p className="text-slate-800">
            <strong>छिंद धाम TOUR TRAVELS</strong>
            <br />
            Bhanpur, Bhopal, Madhya Pradesh, India
          </p>
          <p className="text-slate-600 pt-2 leading-relaxed">
            Providing pickup and drop across Bhopal including Raja Bhoj Airport, Bhopal Junction, Rani Kamlapati Station, MP Nagar, and Lalghati.
          </p>
        </div>
      </div>
    </div>
  );
}
