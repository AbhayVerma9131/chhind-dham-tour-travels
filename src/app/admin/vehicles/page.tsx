import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";
import { getAllVehiclesForAdmin } from "@/server/services/vehicle.service";
import { VehicleManagerClient, VehicleRecord } from "./VehicleManagerClient";
import { ShieldCheck, Car } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const rawVehicles = await getAllVehiclesForAdmin();

  // Map to client-safe VehicleRecord structure
  const formattedVehicles: VehicleRecord[] = rawVehicles.map((v) => ({
    id: v.id,
    slug: v.slug,
    name: v.name,
    brand: v.brand,
    model: v.model ?? null,
    category: v.category ?? null,
    seatingCapacity: v.seatingCapacity ?? null,
    transmission: v.transmission ?? null,
    fuelType: v.fuelType ?? null,
    description: v.description ?? null,
    isActive: v.isActive,
    isFeatured: v.isFeatured,
    supportedModes: v.supportedModes,
    images: (v.images || []).map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      isPrimary: img.isPrimary,
    })),
    rates: (v.rates || []).map((r) => ({
      id: r.id,
      rentalType: r.rentalType,
      durationHours: r.durationHours ?? null,
      seatCategory: r.seatCategory ?? null,
      basePrice: r.basePrice ? Number(r.basePrice) : null,
      ratePerKm: r.ratePerKm ? Number(r.ratePerKm) : null,
      isActive: r.isActive,
    })),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 mb-2">
          <Car className="w-4 h-4 text-blue-600" />
          <span>Fleet &amp; Inventory Operations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Vehicle Catalogue Management
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-2xl">
          Add new cars, remove vehicles, set duration and per-km pricing slabs, and toggle live availability across the छिंद धाम TOUR TRAVELS website.
        </p>
      </div>

      <VehicleManagerClient initialVehicles={formattedVehicles} />
    </div>
  );
}
