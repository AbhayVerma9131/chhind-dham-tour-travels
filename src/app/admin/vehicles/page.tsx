import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";
import { getAllVehicles } from "@/server/services/vehicle.service";
import { Car, Users, Settings2, Fuel, ShieldCheck } from "lucide-react";

export default async function AdminVehiclesPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const vehicles = await getAllVehicles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Vehicle Catalogue Management
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Review fleet inventory, seating capacities, and supported rental models.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Seating</th>
                <th className="py-3 px-4">Transmission</th>
                <th className="py-3 px-4">Fuel</th>
                <th className="py-3 px-4">Rental Modes</th>
                <th className="py-3 px-4">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((v) => (
                <tr key={v.slug} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {v.name}
                    <span className="block text-[10px] text-slate-500 font-normal">
                      Brand: {v.brand}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-700">{v.category || "Standard"}</td>
                  <td className="py-4 px-4 text-slate-700">
                    {v.seatingCapacity ? `${v.seatingCapacity} Seater` : "On Call"}
                  </td>
                  <td className="py-4 px-4 text-slate-700">{v.transmission || "Manual"}</td>
                  <td className="py-4 px-4 text-slate-700">{v.fuelType || "Petrol/Diesel"}</td>
                  <td className="py-4 px-4 text-slate-700">
                    <div className="flex gap-1 flex-wrap">
                      {v.supportedModes.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {v.isFeatured ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">—</span>
                    )}
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
