import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";
import { formatINR } from "@/lib/utils";
import { Tag, ShieldCheck } from "lucide-react";

const CHAUFFEUR_RATES = [
  { seats: 5, rate: 11, models: "Dzire, Aura, Verna", status: "Active & Verified" },
  { seats: 7, rate: 13, models: "Ertiga, Scorpio, Scorpio-N, XUV 700", status: "Active & Verified" },
];

const SELF_DRIVE_SLABS = [
  { vehicle: "Mahindra Thar (4x4)", d6: 2000, d12: 3500, d24: 4200 },
  { vehicle: "Mahindra XUV 700", d6: null, d12: null, d24: 5500 },
  { vehicle: "Mahindra Scorpio-N", d6: null, d12: null, d24: 5500 },
  { vehicle: "Mahindra Scorpio Classic", d6: null, d12: null, d24: 5000 },
  { vehicle: "Hyundai Verna", d6: null, d12: null, d24: 5000 },
];

export default async function AdminPricingPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Tariff &amp; Pricing Management
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Review chauffeur per-kilometre thresholds and self-drive duration hire slabs.
        </p>
      </div>

      {/* Chauffeur Rates */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Tag className="w-4 h-4 text-purple-600" />
          <span>Chauffeur-Driven Per-Kilometre Rates</span>
        </h2>

        <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Seating Category</th>
                <th className="py-3 px-4">Verified Rate</th>
                <th className="py-3 px-4">Applicable Fleet</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CHAUFFEUR_RATES.map((r) => (
                <tr key={r.seats} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{r.seats} Seater</td>
                  <td className="py-4 px-4 font-bold text-emerald-700 text-sm">₹{r.rate} / km</td>
                  <td className="py-4 px-4 text-slate-700">{r.models}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Self-Drive Slabs */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <span>Self-Drive Duration Slabs</span>
        </h2>

        <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4 text-center">6 Hours</th>
                <th className="py-3 px-4 text-center">12 Hours</th>
                <th className="py-3 px-4 text-center">24 Hours (Full Day)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SELF_DRIVE_SLABS.map((s) => (
                <tr key={s.vehicle} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{s.vehicle}</td>
                  <td className="py-4 px-4 text-center text-slate-700">
                    {s.d6 ? <strong className="text-emerald-700">{formatINR(s.d6)}</strong> : "Contact for Price"}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-700">
                    {s.d12 ? <strong className="text-emerald-700">{formatINR(s.d12)}</strong> : "Contact for Price"}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-700">
                    {s.d24 ? <strong className="text-emerald-700">{formatINR(s.d24)}</strong> : "Contact for Price"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
