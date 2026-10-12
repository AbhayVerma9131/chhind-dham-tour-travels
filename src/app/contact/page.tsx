import { Phone, MapPin, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildWhatsAppLink } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | छिंद धाम TOUR TRAVELS",
  description:
    "Contact छिंद धाम TOUR TRAVELS in Bhanpur, Bhopal. Call Karan Kushwaha (9691345722) or Akash Ahirwar (7400950207) for car hire & tour bookings.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
          <Phone className="w-4 h-4 text-blue-600" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Contact छिंद धाम TOUR TRAVELS
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Have an inquiry regarding car hire, self-drive tariffs, or custom pilgrimage routes? Reach out via phone, WhatsApp, or submit a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Direct Phone Contacts</h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Primary Contact / Owner</span>
                <div className="text-sm font-bold text-slate-900">Karan Kushwaha</div>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="tel:9691345722"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call 9691345722</span>
                  </a>
                  <a
                    href={buildWhatsAppLink("9691345722", "Hello Karan, I have an inquiry.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Secondary Contact</span>
                <div className="text-sm font-bold text-slate-900">Akash Ahirwar</div>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="tel:7400950207"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call 7400950207</span>
                  </a>
                  <a
                    href={buildWhatsAppLink("7400950207", "Hello Akash, I have an inquiry.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Office Location:</strong>
                  <br />
                  Bhanpur, Bhopal, Madhya Pradesh, India
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Operating Hours:</strong>
                  <br />
                  Open Daily for Booking Inquiries &amp; 24x7 Road Transit
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Message Form */}
        <div className="lg:col-span-7">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Send a Message</h2>
            <p className="text-xs text-slate-600">
              For general questions or partnership proposals, send us a note and we will reply as soon as possible.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
