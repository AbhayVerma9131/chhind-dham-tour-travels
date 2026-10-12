import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | छिंद धाम TOUR TRAVELS",
    default: "छिंद धाम TOUR TRAVELS — Car Rental & Tour Services Bhopal",
  },
  description:
    "Premium self-drive car rentals, chauffeur-driven vehicles, outstation trips, and pilgrimage tours in Bhanpur, Bhopal, Madhya Pradesh.",
  keywords: [
    "छिंद धाम TOUR TRAVELS",
    "Car Rental Bhopal",
    "Self Drive Bhopal",
    "Taxi Service Bhopal",
    "Bhopal Tour Travels",
    "Bhopal to Maihar Cab",
    "Bhopal to Bagalamukhi Dham",
  ],
  authors: [{ name: "छिंद धाम TOUR TRAVELS" }],
  openGraph: {
    title: "छिंद धाम TOUR TRAVELS — Bhopal Car Rental & Tour Services",
    description: "Self-drive car rentals, verified chauffeur-driven rides & pilgrimage tours in Bhopal.",
    siteName: "छिंद धाम TOUR TRAVELS",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="bg-background text-slate-900 antialiased min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
