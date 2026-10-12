export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "TravelAgency"],
    name: "छिंद धाम TOUR TRAVELS",
    description:
      "Self-drive car rentals, verified chauffeur-driven vehicles, outstation trips, and pilgrimage tours in Bhanpur, Bhopal, Madhya Pradesh.",
    url: "https://chhinddhamtravels.com",
    telephone: "+91-9691345722",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bhanpur",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462037",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.3039",
      longitude: "77.4478",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9691345722",
        contactType: "customer service",
        name: "Karan Kushwaha",
        availableLanguage: ["Hindi", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-7400950207",
        contactType: "reservations",
        name: "Akash Ahirwar",
        availableLanguage: ["Hindi", "English"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
