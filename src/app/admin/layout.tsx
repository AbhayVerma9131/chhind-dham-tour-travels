import Link from "next/link";
import { getCurrentAdminSession } from "@/lib/auth";
import { ShieldCheck, Calendar, Car, Tag, Compass, FileText, LogOut } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const pathname = headerList.get("x-pathname") || "";

  // Allow unauthenticated access only to /admin/login
  const session = await getCurrentAdminSession();

  // If rendering children on login page, don't show the dashboard shell
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {session && (
        <div className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-6 overflow-x-auto py-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Portal</span>
                </span>

                <nav className="flex items-center gap-1 text-xs font-medium">
                  <Link
                    href="/admin/dashboard"
                    className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/bookings"
                    className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Bookings
                  </Link>
                  <Link
                    href="/admin/vehicles"
                    className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Fleet
                  </Link>
                  <Link
                    href="/admin/pricing"
                    className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/admin/packages"
                    className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Packages
                  </Link>
                  <Link
                    href="/admin/audit"
                    className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Audit Log
                  </Link>
                </nav>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Signed in as <strong className="text-slate-800">{session.name}</strong>
                </span>
                <form action="/api/v1/admin/logout" method="POST">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
