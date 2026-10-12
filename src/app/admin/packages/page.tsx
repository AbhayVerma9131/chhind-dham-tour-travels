import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";
import { getAllTourPackages } from "@/server/services/package.service";
import { formatINR } from "@/lib/utils";
import { Compass, CheckCircle2 } from "lucide-react";

export default async function AdminPackagesPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const packages = await getAllTourPackages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Tour &amp; Pilgrimage Package Management
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Monitor sacred travel routes, assigned fleet vehicles, and base booking rates.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Package Route</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Base Rate</th>
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Inclusions &amp; Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((p) => (
                <tr key={p.slug} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {p.title}
                    <span className="block text-[10px] text-slate-500 font-normal">
                      Origin: {p.origin}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-700">{p.destination}</td>
                  <td className="py-4 px-4 font-bold text-emerald-700 text-sm">
                    {formatINR(Number(p.basePrice))}
                  </td>
                  <td className="py-4 px-4 text-slate-700">
                    {p.vehicleModel || "Standard"}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Published
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 max-w-xs">
                    {p.inclusionsNotes || "Standard pilgrimage itinerary"}
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
