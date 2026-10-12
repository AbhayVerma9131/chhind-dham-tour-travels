"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarCheck, ShieldCheck } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1">
                <span className="text-blue-600">छिंद धाम</span>
                <span className="tracking-wide text-xs sm:text-sm font-semibold text-slate-700">TOUR TRAVELS</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-500 font-medium">Bhanpur, Bhopal</span>
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
