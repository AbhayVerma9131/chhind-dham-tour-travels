import { getAllVehicles } from "@/server/services/vehicle.service";
import { getAllTourPackages } from "@/server/services/package.service";
import { FullBookingForm } from "@/components/booking/FullBookingForm";
import { CalendarCheck, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book / Travel Enquiry",
  description:
    "Submit your booking enquiry for self-drive cars, chauffeur rentals, or pilgrimage tours with छिंद धाम TOUR TRAVELS, Bhopal.",
};

interface BookingPageProps {
  searchParams?: {
    type?: "SELF_DRIVE" | "CHAUFFEUR" | "TOUR_PACKAGE";
    vehicle?: string;
    package?: string;
  };
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const [vehicles, packages] = await Promise.all([
    getAllVehicles(),
    getAllTourPackages(),
  ]);

  const vehicleOptions = vehicles.map((v) => ({ id: v.id, name: v.name }));
  const packageOptions = packages.map((p) => ({ id: p.id, name: p.title }));

  // Match optional preselected vehicle or package by slug
  const preselectedVehicle = vehicles.find((v) => v.slug === searchParams?.vehicle)?.id || "";
  const preselectedPackage = packages.find((p) => p.slug === searchParams?.package)?.id || "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
          <CalendarCheck className="w-4 h-4 text-blue-600" />
          <span>Trip Enquiry &amp; Reservation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Book Your Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Fill out your trip details below. All enquiries enter as <strong>PENDING</strong> and are reviewed by our operations team before confirmation.
        </p>
      </div>

      <FullBookingForm
        vehicles={vehicleOptions}
        packages={packageOptions}
        initialRentalType={searchParams?.type || "SELF_DRIVE"}
        initialVehicleId={preselectedVehicle}
        initialPackageId={preselectedPackage}
      />
    </div>
  );
}
