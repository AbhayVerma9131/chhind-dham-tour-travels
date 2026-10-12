import { MetadataRoute } from "next";
import { SEED_VEHICLES } from "@/server/services/vehicle.service";
import { SEED_TOUR_PACKAGES } from "@/server/services/package.service";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://chhinddhamtravels.com";
  const now = new Date();

  const staticRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${baseUrl}/cars`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${baseUrl}/self-drive`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/with-driver`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/tour-packages`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/booking`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/track`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/cancellation-policy`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const vehicleRoutes = SEED_VEHICLES.map((v) => ({
    url: `${baseUrl}/cars/${v.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const packageRoutes = SEED_TOUR_PACKAGES.map((p) => ({
    url: `${baseUrl}/tour-packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((r) => ({
      ...r,
      lastModified: now,
    })),
    ...vehicleRoutes,
    ...packageRoutes,
  ];
}
