import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/config";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/products/no-sweat", priority: 0.9 },
  { path: "/shop", priority: 0.8 },
  { path: "/how-it-works", priority: 0.7 },
  { path: "/testing", priority: 0.7 },
  { path: "/commercial", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/safety", priority: 0.6 },
  { path: "/about", priority: 0.4 },
  { path: "/contact", priority: 0.4 },
  { path: "/shipping-returns", priority: 0.3 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return ROUTES.map(({ path, priority }) => ({ url: `${base}${path}`, priority }));
}
