import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | छिंद धाम TOUR TRAVELS",
  description: "Terms and conditions for car rental and tour travel services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-600">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Terms and Conditions</h1>
        <p className="text-xs text-slate-500">
          Last updated: October 2026 • <strong>छिंद धाम TOUR TRAVELS</strong>, Bhanpur, Bhopal, Madhya Pradesh
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Nature of Booking Enquiry</h2>
          <p>
            Submission of an online enquiry through our website does not represent a confirmed reservation. Every booking is subject to vehicle availability, route review, and manual confirmation by our operations team.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Documentation for Self-Drive Rentals</h2>
          <p>
            Customers electing self-drive rental services must present a valid, original Indian Driving License (or International Driving Permit where permitted by law) alongside a government-issued identity proof (Aadhaar, Passport, or Voter ID). Handover of the vehicle is strictly contingent upon document verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Chauffeur-Driven Tariffs</h2>
          <p>
            Chauffeur per-kilometre charges (₹11/km for 5-seater category and ₹13/km for 7-seater category) cover vehicle use and the driver. Toll taxes, parking charges, interstate border taxes, and any route-specific allowances are calculated in accordance with the confirmed trip itinerary.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Vehicle Safety and Usage</h2>
          <p>
            Vehicles must not be used for illegal activities, subleasing, or exceeding legal passenger capacity limits. Driving under the influence of alcohol, drugs, or hazardous substances is strictly prohibited and terminates the hire agreement immediately with full forfeiture of security.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of Madhya Pradesh, India. Any disputes are subject to the jurisdiction of the courts in Bhopal, Madhya Pradesh.
          </p>
        </section>
      </div>
    </div>
  );
}
