/** Facts about the business. Sourced from the Safety Data Sheet where noted. */
export const SITE = {
  name: "No Sweat®",
  shortName: "No Sweat",
  description:
    "No Sweat® is a clear, water-based spray engineered to reduce exterior condensation on cold drinkware, from a 4 oz personal bottle to a commercial gallon.",
  /** From the Safety Data Sheet (manufacturer / supplier block). */
  contact: {
    phone: "207-745-7575",
    phoneHref: "tel:+12077457575",
    phoneNote: "Product information and emergencies",
    addressLines: ["PO Box 52", "Detroit, ME 04929"],
    country: "USA",
  },
  family: { name: "Se7en", url: "https://se7eninc.com" },
} as const;

export const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/testing", label: "Testing" },
  { href: "/#applications", label: "Applications" },
  { href: "/shop", label: "Shop" },
  { href: "/commercial", label: "Commercial" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { href: "/products/no-sweat", label: "No Sweat® spray" },
    { href: "/shop", label: "All sizes" },
    { href: "/commercial", label: "Commercial & wholesale" },
  ],
  learn: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/testing", label: "Testing" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
  ],
  support: [
    { href: "/safety", label: "Safety & directions" },
    { href: "/doc/No_Sweat_SDS.pdf", label: "Safety Data Sheet (PDF)", external: true },
    { href: "/shipping-returns", label: "Shipping & returns" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

/**
 * Placeholder destinations: the client has not supplied profile URLs yet.
 * Replace each href before launch.
 */
export const SOCIALS = [
  { key: "youtube", name: "YouTube", href: "https://www.youtube.com" },
  { key: "rumble", name: "Rumble", href: "https://rumble.com" },
  { key: "liberty", name: "Liberty Social", href: "https://libertysocial.com" },
  { key: "facebook", name: "Facebook", href: "https://www.facebook.com" },
  { key: "x", name: "X", href: "https://x.com" },
  { key: "instagram", name: "Instagram", href: "https://www.instagram.com" },
  { key: "tiktok", name: "TikTok", href: "https://www.tiktok.com" },
  { key: "yelp", name: "Yelp", href: "https://www.yelp.com" },
  { key: "truth", name: "Truth Social", href: "https://truthsocial.com" },
  { key: "threads", name: "Threads", href: "https://www.threads.net" },
] as const;
