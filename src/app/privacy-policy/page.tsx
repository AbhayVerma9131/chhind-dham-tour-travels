import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | छिंद धाम TOUR TRAVELS",
  description: "Privacy policy explaining customer data collection and protection.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-600">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">
          Last updated: October 2026 • <strong>छिंद धाम TOUR TRAVELS</strong>, Bhanpur, Bhopal, Madhya Pradesh
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you submit a booking enquiry or contact form on our website, we collect your name, phone number, email address (optional), travel dates, pickup location, and trip requirements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Data</h2>
          <p>
            We use your information solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Process and respond to your rental and pilgrimage trip requests.</li>
            <li>Coordinate pickup schedules and vehicle preparation.</li>
            <li>Maintain communication regarding your itinerary via phone or WhatsApp.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties for marketing purposes. Data is accessed only by authorized team members of छिंद धाम TOUR TRAVELS.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Data Security</h2>
          <p>
            We implement industry-standard technical measures, including encrypted HTTPS transmission, server-side data sanitization, and access control mechanisms to safeguard your personal details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          <p>
            For privacy inquiries or deletion requests, contact Karan Kushwaha (9691345722) or Akash Ahirwar (7400950207), Bhanpur, Bhopal.
          </p>
        </section>
      </div>
    </div>
  );
}
