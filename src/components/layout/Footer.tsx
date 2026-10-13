import Link from "next/link";
import { Phone, MapPin, Shield, MessageSquare, ArrowUpRight, Star } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-16 w-auto max-w-[200px] overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="छिंद धाम TOUR TRAVELS Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500">Bhanpur, Bhopal</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Professional car rental and pilgrimage travel agency serving Bhopal and outstation routes across Madhya Pradesh.
            </p>
            {/* 11 Years Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 shadow-sm">
              <Star className="w-4 h-4 fill-amber-900 text-amber-900" />
              <div>
                <div className="text-[11px] font-bold text-amber-900 leading-tight">Working with customers since</div>
                <div className="text-base font-extrabold text-amber-900 leading-tight">11 Years ✦</div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Fleet &amp; Driver Network</span>
            </div>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <div className="text-xs text-slate-500 font-medium">Owner &amp; Operations:</div>
                <a
                  href="tel:9691345722"
                  className="font-medium text-slate-800 hover:text-blue-600 flex items-center gap-2 mt-0.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Karan Kushwaha — 9691345722</span>
                </a>
              </li>
              <li>
                <div className="text-xs text-slate-500 font-medium">Tour &amp; Rental Enquiries:</div>
                <a
                  href="tel:7400950207"
                  className="font-medium text-slate-800 hover:text-blue-600 flex items-center gap-2 mt-0.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Akash Ahirwar — 7400950207</span>
                </a>
              </li>
              <li className="pt-1 flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Bhanpur, Bhopal, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/self-drive" className="hover:text-blue-600 transition-colors">
                  Self-Drive Rentals
                </Link>
              </li>
              <li>
                <Link href="/with-driver" className="hover:text-blue-600 transition-colors">
                  Chauffeur Rentals (5 &amp; 7 Seater)
                </Link>
              </li>
              <li>
                <Link href="/tour-packages" className="hover:text-blue-600 transition-colors">
                  Pilgrimage &amp; Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-blue-600 transition-colors">
                  Complete Fleet Catalogue
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-blue-600 transition-colors">
                  Submit Booking Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Instant Connect & WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Instant Chat
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Need immediate availability or custom quote for outstation travel? Chat directly with us on WhatsApp.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={buildWhatsAppLink("9691345722", "Hello छिंद धाम TOUR TRAVELS, I want to enquire about car rental/tour.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-emerald-800 font-semibold text-xs shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: Karan (9691345722)</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-emerald-600" />
              </a>
              <a
                href={buildWhatsAppLink("7400950207", "Hello छिंद धाम TOUR TRAVELS, I want to enquire about car rental/tour.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-emerald-800 font-semibold text-xs shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: Akash (7400950207)</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-emerald-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} <span className="text-slate-800 font-semibold">छिंद धाम TOUR TRAVELS</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="hover:text-slate-800 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cancellation-policy" className="hover:text-slate-800 transition-colors">
              Cancellation Policy
            </Link>
            <Link href="/admin/login" className="hover:text-slate-800 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
