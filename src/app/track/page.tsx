import { TrackEnquiryClient } from "./TrackEnquiryClient";
import { Search, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Booking Enquiry Status",
  description:
    "Check the live verification status of your booking enquiry with छिंद धाम TOUR TRAVELS, Bhopal.",
};

export default function TrackPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Real-Time Status Lookup</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Track Your Enquiry
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter your unique booking reference (e.g. <strong className="text-slate-800">CDT-20261013-XXXX</strong>) to check verification progress, driver allocation, and trip confirmation.
        </p>
      </div>

      <TrackEnquiryClient />
    </div>
  );
}
