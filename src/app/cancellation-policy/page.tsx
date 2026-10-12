import { Metadata } from "next";
import Link from "next/link";
import { Phone, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | छिंद धाम TOUR TRAVELS",
  description: "Cancellation and refund policies for car hire and pilgrimage tours.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-600">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Cancellation &amp; Refund Policy</h1>
        <p className="text-xs text-slate-500">
          Last updated: October 2026 • <strong>छिंद धाम TOUR TRAVELS</strong>, Bhanpur, Bhopal, Madhya Pradesh
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-700 flex items-start gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
          <p>
            Because every trip enquiry is evaluated individually prior to vehicle reservation, our cancellation policy ensures maximum fairness for both travelers and drivers.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Cancellation of Unconfirmed Enquiries</h2>
          <p>
            Any booking enquiry with status <strong>PENDING</strong> may be cancelled at any time prior to admin confirmation at absolutely zero cost. Simply contact our support team quoting your reference number.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Cancellation of Confirmed Bookings</h2>
          <p>
            Once a booking request is officially confirmed by our team and a vehicle is dispatched or reserved:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              <strong>Cancellation more than 24 hours prior to pickup:</strong> Eligible for rescheduling or token refund subject to vehicle allocation expenses.
            </li>
            <li>
              <strong>Cancellation within 24 hours of scheduled pickup:</strong> May incur a driver mobilization and holding fee.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. How to Request Cancellation or Rescheduling</h2>
          <p>
            To cancel or reschedule an existing booking, please reach out directly:
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <a
              href="tel:9691345722"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Karan Kushwaha (9691345722)</span>
            </a>
            <a
              href="tel:7400950207"
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Call Akash Ahirwar (7400950207)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
