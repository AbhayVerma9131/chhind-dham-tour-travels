"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Fleet" },
  { href: "/self-drive", label: "Self-Drive" },
  { href: "/with-driver", label: "With Driver" },
  { href: "/tour-packages", label: "Tour Packages" },
  { href: "/track", label: "Track Status" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Trust Bar */}
      <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-1.5 px-4 text-center text-[11px] sm:text-xs font-semibold text-amber-900 tracking-wide flex items-center justify-center gap-2">
        <Star className="w-3 h-3 fill-amber-800 text-amber-800" />
        <span>Trusted by thousands of families — Working with customers since <strong>11 years</strong></span>
        <Star className="w-3 h-3 fill-amber-800 text-amber-800" />
      </div>

      <div className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all shrink-0 flex items-center justify-center border-2 border-amber-100">
                <img
                  src="/images/logo.png"
                  alt="छिंद धाम TOUR TRAVELS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">छिंद धाम</span>
                  <span className="tracking-wide text-xs sm:text-sm font-semibold text-slate-600">TOUR TRAVELS</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">Bhanpur, Bhopal</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-[9px] font-extrabold text-amber-900 shadow-sm">
                    <Star className="w-2 h-2 fill-amber-900 text-amber-900" />
                    11 YEARS
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-blue-600 bg-blue-50 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:9691345722"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>9691345722</span>
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Book / Enquiry</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 shadow-xl backdrop-blur-lg px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                  isActive
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Mobile: 11 Years Trust Badge */}
          <div className="mx-3 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
            <span className="text-xs font-semibold text-amber-800">Working with customers since <strong>11 Years</strong></span>
          </div>
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book / Send Enquiry</span>
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <a
                href="tel:9691345722"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Karan</span>
              </a>
              <a
                href="tel:7400950207"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Akash</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
