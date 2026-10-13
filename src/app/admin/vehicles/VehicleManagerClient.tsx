"use client";

import { useState } from "react";
import {
  Car,
  Plus,
  Trash2,
  Tag,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Fuel,
  Users,
  Settings2,
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { formatINR, getCarImageUrl } from "@/lib/utils";

interface RateRecord {
  id?: string;
  rentalType: string;
  durationHours?: number | null;
  seatCategory?: number | null;
  basePrice?: number | string | null;
  ratePerKm?: number | string | null;
  isActive?: boolean;
}

interface ImageRecord {
  id?: string;
  imageUrl: string;
  isPrimary?: boolean;
}

export interface VehicleRecord {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string | null;
  category: string | null;
  seatingCapacity: number | null;
  transmission: string | null;
  fuelType: string | null;
  description: string | null;
  isActive: boolean;
  isFeatured: boolean;
  supportedModes: string[];
  images?: ImageRecord[];
  rates?: RateRecord[];
}

export function VehicleManagerClient({
  initialVehicles,
}: {
  initialVehicles: VehicleRecord[];
}) {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(initialVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<"ALL" | "AVAILABLE" | "UNAVAILABLE">("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPricingVehicle, setEditingPricingVehicle] = useState<VehicleRecord | null>(null);

  // Add Form State
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    category: "SUV",
    seatingCapacity: "5",
    transmission: "Manual",
    fuelType: "Diesel",
    description: "",
    imageUrl: "",
    isFeatured: false,
    isActive: true,
    supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
    // Pricing
    ratePerKm: "",
    selfDrive6h: "",
    selfDrive12h: "",
    selfDrive24h: "",
  });

  // Edit Pricing Form State
  const [pricingFormData, setPricingFormData] = useState({
    ratePerKm: "",
    selfDrive6h: "",
    selfDrive12h: "",
    selfDrive24h: "",
  });

  // Filter vehicles
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.category && v.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAvailability =
      filterMode === "ALL"
        ? true
        : filterMode === "AVAILABLE"
        ? v.isActive
        : !v.isActive;

    return matchesSearch && matchesAvailability;
  });

  // Toggle vehicle availability
  const handleToggleAvailability = async (vehicle: VehicleRecord) => {
    setUpdatingId(vehicle.id);
    setNotice(null);

    const newActive = !vehicle.isActive;
    try {
      const res = await fetch(`/api/v1/admin/vehicles/${vehicle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update availability.");
      }

      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? { ...v, isActive: newActive } : v))
      );

      setNotice({
        type: "success",
        message: `${vehicle.name} is now ${newActive ? "Available (Active)" : "Marked Unavailable"}.`,
      });
    } catch (err: any) {
      setNotice({ type: "error", message: err.message || "Failed to toggle status." });
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete vehicle
  const handleDeleteVehicle = async (vehicle: VehicleRecord) => {
    if (!confirm(`Are you sure you want to remove ${vehicle.name} from the fleet catalogue?`)) {
      return;
    }

    setUpdatingId(vehicle.id);
    setNotice(null);

    try {
      const res = await fetch(`/api/v1/admin/vehicles/${vehicle.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete vehicle.");
      }

      setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
      setNotice({
        type: "success",
        message: `${vehicle.name} removed successfully from fleet.`,
      });
    } catch (err: any) {
      setNotice({ type: "error", message: err.message || "Failed to delete vehicle." });
    } finally {
      setUpdatingId(null);
    }
  };

  // Open Edit Pricing Modal
  const openPricingModal = (vehicle: VehicleRecord) => {
    setEditingPricingVehicle(vehicle);

    // Extract rates
    const chauffeurRate = vehicle.rates?.find((r) => r.rentalType === "CHAUFFEUR");
    const sd6 = vehicle.rates?.find((r) => r.rentalType === "SELF_DRIVE" && r.durationHours === 6);
    const sd12 = vehicle.rates?.find((r) => r.rentalType === "SELF_DRIVE" && r.durationHours === 12);
    const sd24 = vehicle.rates?.find((r) => r.rentalType === "SELF_DRIVE" && r.durationHours === 24);

    setPricingFormData({
      ratePerKm: chauffeurRate?.ratePerKm ? String(chauffeurRate.ratePerKm) : (vehicle.seatingCapacity === 7 ? "13" : "11"),
      selfDrive6h: sd6?.basePrice ? String(sd6.basePrice) : "",
      selfDrive12h: sd12?.basePrice ? String(sd12.basePrice) : "",
      selfDrive24h: sd24?.basePrice ? String(sd24.basePrice) : "",
    });
  };

  // Save Pricing Modal
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricingVehicle) return;

    setUpdatingId(editingPricingVehicle.id);
    setNotice(null);

    try {
      const payload: any = {};
      if (pricingFormData.ratePerKm) payload.ratePerKm = Number(pricingFormData.ratePerKm);
      if (pricingFormData.selfDrive6h) payload.selfDrive6h = Number(pricingFormData.selfDrive6h);
      if (pricingFormData.selfDrive12h) payload.selfDrive12h = Number(pricingFormData.selfDrive12h);
      if (pricingFormData.selfDrive24h) payload.selfDrive24h = Number(pricingFormData.selfDrive24h);

      const res = await fetch(`/api/v1/admin/vehicles/${editingPricingVehicle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update pricing.");
      }

      // Update in state
      setVehicles((prev) =>
        prev.map((v) => (v.id === editingPricingVehicle.id ? (data.data || v) : v))
      );

      setNotice({
        type: "success",
        message: `Pricing updated for ${editingPricingVehicle.name}.`,
      });
      setEditingPricingVehicle(null);
    } catch (err: any) {
      setNotice({ type: "error", message: err.message || "Failed to save pricing." });
    } finally {
      setUpdatingId(null);
    }
  };

  // Submit Add Vehicle
  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingId("adding-new");
    setNotice(null);

    try {
      const payload = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        model: formData.model.trim() || undefined,
        category: formData.category.trim() || "SUV",
        seatingCapacity: formData.seatingCapacity ? Number(formData.seatingCapacity) : 5,
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        description: formData.description.trim() || undefined,
        imageUrl: formData.imageUrl.trim() || undefined,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
        supportedModes: formData.supportedModes,
        ratePerKm: formData.ratePerKm ? Number(formData.ratePerKm) : undefined,
        selfDrive6h: formData.selfDrive6h ? Number(formData.selfDrive6h) : undefined,
        selfDrive12h: formData.selfDrive12h ? Number(formData.selfDrive12h) : undefined,
        selfDrive24h: formData.selfDrive24h ? Number(formData.selfDrive24h) : undefined,
      };

      const res = await fetch("/api/v1/admin/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create vehicle.");
      }

      setVehicles((prev) => [data.data, ...prev]);
      setNotice({
        type: "success",
        message: `Vehicle "${data.data.name}" added successfully to fleet!`,
      });
      setShowAddModal(false);
      setFormData({
        name: "",
        brand: "",
        model: "",
        category: "SUV",
        seatingCapacity: "5",
        transmission: "Manual",
        fuelType: "Diesel",
        description: "",
        imageUrl: "",
        isFeatured: false,
        isActive: true,
        supportedModes: ["SELF_DRIVE", "CHAUFFEUR"],
        ratePerKm: "",
        selfDrive6h: "",
        selfDrive12h: "",
        selfDrive24h: "",
      });
    } catch (err: any) {
      setNotice({ type: "error", message: err.message || "Failed to add vehicle." });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Notices */}
      {notice && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-medium border shadow-sm ${
            notice.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {notice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{notice.message}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by car name, brand, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterMode("ALL")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterMode === "ALL"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({vehicles.length})
            </button>
            <button
              onClick={() => setFilterMode("AVAILABLE")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterMode === "AVAILABLE"
                  ? "bg-white text-emerald-700 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Available ({vehicles.filter((v) => v.isActive).length})
            </button>
            <button
              onClick={() => setFilterMode("UNAVAILABLE")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterMode === "UNAVAILABLE"
                  ? "bg-white text-rose-700 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Unavailable ({vehicles.filter((v) => !v.isActive).length})
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Vehicle Grid Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((car) => {
          const photoUrl = getCarImageUrl(car.slug, car.images?.[0]?.imageUrl);
          const chauffeurRate = car.rates?.find((r) => r.rentalType === "CHAUFFEUR");
          const selfDrive24 = car.rates?.find(
            (r) => r.rentalType === "SELF_DRIVE" && r.durationHours === 24
          );

          return (
            <div
              key={car.id}
              className={`rounded-3xl border bg-white overflow-hidden shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
                car.isActive ? "border-slate-200" : "border-rose-200 opacity-85 bg-slate-50/50"
              }`}
            >
              {/* Photo Banner */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={photoUrl}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow ${
                      car.isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-rose-600 text-white"
                    }`}
                  >
                    {car.isActive ? "Available" : "Unavailable"}
                  </span>
                  {car.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow">
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-3 text-white z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200 block">
                    {car.brand}
                  </span>
                  <h3 className="text-base font-extrabold text-white drop-shadow">
                    {car.name}
                  </h3>
                </div>
              </div>

              {/* Specs & Pricing Overview */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-700">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <Users className="w-3.5 h-3.5 text-blue-600 mx-auto mb-0.5" />
                      <span className="text-[9px] text-slate-500 block">Seats</span>
                      <span className="font-bold text-slate-800">{car.seatingCapacity || "—"}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <Settings2 className="w-3.5 h-3.5 text-blue-600 mx-auto mb-0.5" />
                      <span className="text-[9px] text-slate-500 block">Gear</span>
                      <span className="font-bold text-slate-800 truncate block">{car.transmission || "Manual"}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <Fuel className="w-3.5 h-3.5 text-blue-600 mx-auto mb-0.5" />
                      <span className="text-[9px] text-slate-500 block">Fuel</span>
                      <span className="font-bold text-slate-800 truncate block">{car.fuelType || "Petrol"}</span>
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Chauffeur Rate:</span>
                      <span className="font-bold text-purple-700">
                        {chauffeurRate?.ratePerKm
                          ? `₹${chauffeurRate.ratePerKm} / km`
                          : car.seatingCapacity === 7
                          ? "₹13 / km (Std)"
                          : "₹11 / km (Std)"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Self-Drive (24h):</span>
                      <span className="font-bold text-emerald-700">
                        {selfDrive24?.basePrice ? formatINR(Number(selfDrive24.basePrice)) : "On Request"}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {car.description || "Tour and travel rental vehicle in Bhopal."}
                  </p>
                </div>

                {/* Card Action Controls */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {/* Availability Toggle */}
                  <button
                    onClick={() => handleToggleAvailability(car)}
                    disabled={updatingId === car.id}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      car.isActive
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                    }`}
                    title={car.isActive ? "Mark Unavailable" : "Mark Available"}
                  >
                    {car.isActive ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Enable</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    {/* Pricing Edit Button */}
                    <button
                      onClick={() => openPricingModal(car)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Rates</span>
                    </button>

                    {/* Delete Vehicle */}
                    <button
                      onClick={() => handleDeleteVehicle(car)}
                      disabled={updatingId === car.id}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                      title="Remove vehicle from fleet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD NEW VEHICLE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  <span>Add New Vehicle to Fleet</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set vehicle specifications, photos, and rental pricing.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Vehicle Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Toyota Innova Crysta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Toyota, Mahindra, Tata"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Premium SUV">Premium SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="MUV">MUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Travel Vehicle">Travel Carrier</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Seating Capacity
                  </label>
                  <select
                    value={formData.seatingCapacity}
                    onChange={(e) => setFormData({ ...formData, seatingCapacity: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="4">4 Seater</option>
                    <option value="5">5 Seater (Standard Sedan)</option>
                    <option value="7">7 Seater (MUV / SUV)</option>
                    <option value="8">8 Seater</option>
                    <option value="12">12 Seater Tempo</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Transmission
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual / Automatic">Manual / Automatic</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Fuel Type
                  </label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="CNG / Petrol">CNG / Petrol</option>
                    <option value="Diesel / Petrol">Diesel / Petrol</option>
                  </select>
                </div>
              </div>

              {/* Photo Image Selection */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Vehicle Image URL (or select preset)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/images/cars/scorpio.png or https://..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <select
                    onChange={(e) => {
                      if (e.target.value) setFormData({ ...formData, imageUrl: e.target.value });
                    }}
                    className="p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-medium"
                  >
                    <option value="">Choose Preset Photo</option>
                    <option value="/images/cars/mahindra-thar.png">Mahindra Thar</option>
                    <option value="/images/cars/xuv-700.png">Mahindra XUV 700</option>
                    <option value="/images/cars/scorpio-n.png">Scorpio-N</option>
                    <option value="/images/cars/scorpio.png">Scorpio Classic</option>
                    <option value="/images/cars/ertiga.png">Maruti Ertiga</option>
                    <option value="/images/cars/verna.png">Hyundai Verna</option>
                    <option value="/images/cars/dzire.png">Maruti Dzire</option>
                    <option value="/images/cars/aura.png">Hyundai Aura</option>
                    <option value="/images/cars/victoris.png">Tour Carrier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Tour & travel description, ideal use (e.g. family outstation trips, Bhopal city hire)..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Pricing Slabs */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-purple-600" />
                  <span>Rental Pricing Configuration</span>
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                      Chauffeur Rate (₹/km)
                    </label>
                    <input
                      type="number"
                      placeholder="11 or 13"
                      value={formData.ratePerKm}
                      onChange={(e) => setFormData({ ...formData, ratePerKm: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                      Self-Drive 6h (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2000"
                      value={formData.selfDrive6h}
                      onChange={(e) => setFormData({ ...formData, selfDrive6h: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                      Self-Drive 12h (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 3500"
                      value={formData.selfDrive12h}
                      onChange={(e) => setFormData({ ...formData, selfDrive12h: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                      Self-Drive 24h (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={formData.selfDrive24h}
                      onChange={(e) => setFormData({ ...formData, selfDrive24h: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-700">Available Immediately</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-700">Featured on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingId === "adding-new"}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-colors"
                >
                  {updatingId === "adding-new" ? "Adding Vehicle..." : "Save & Add to Fleet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT VEHICLE PRICING */}
      {editingPricingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <span>Update Pricing: {editingPricingVehicle.name}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set chauffeur rate per-km and self-drive duration slabs.
                </p>
              </div>
              <button
                onClick={() => setEditingPricingVehicle(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Chauffeur Rate (₹ / Kilometre)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 11 or 13"
                  value={pricingFormData.ratePerKm}
                  onChange={(e) =>
                    setPricingFormData({ ...pricingFormData, ratePerKm: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Includes driver. 5-seaters typically ₹11/km; 7-seaters typically ₹13/km.
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <span className="font-semibold text-slate-900 block">
                  Self-Drive Duration Hire Slabs:
                </span>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-600 block mb-1">
                    6 Hours Slot Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2000 (leave blank if on request)"
                    value={pricingFormData.selfDrive6h}
                    onChange={(e) =>
                      setPricingFormData({ ...pricingFormData, selfDrive6h: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-600 block mb-1">
                    12 Hours Slot Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 3500 (leave blank if on request)"
                    value={pricingFormData.selfDrive12h}
                    onChange={(e) =>
                      setPricingFormData({ ...pricingFormData, selfDrive12h: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-600 block mb-1">
                    24 Hours (Full Day) Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 4200, 5000, 5500"
                    value={pricingFormData.selfDrive24h}
                    onChange={(e) =>
                      setPricingFormData({ ...pricingFormData, selfDrive24h: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPricingVehicle(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingId === editingPricingVehicle.id}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-sm transition-colors"
                >
                  {updatingId === editingPricingVehicle.id ? "Saving Rates..." : "Save Pricing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
