import type { MenuCategoryMeta, MenuCategorySlug } from "@/types/menu";

/** Canonical labels align marketing copy with CMS category slugs we normalize against. */
export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  {
    slug: "coffee",
    label: "Coffee",
    description: "Espresso classics and slow pours.",
  },
  {
    slug: "tea",
    label: "Tea",
    description: "Whole-leaf brews and signature blends.",
  },
  {
    slug: "pastries",
    label: "Pastries",
    description: "Daily bakes from our kitchen.",
  },
  {
    slug: "seasonal",
    label: "Seasonal Drinks",
    description: "Limited pours inspired by the season.",
  },
];

export const CATEGORY_ORDER: MenuCategorySlug[] = MENU_CATEGORIES.map(
  (c) => c.slug,
);

export const SITE = {
  name: "Umi House",
  tagline: "Modern Asian café · Slow rituals, bright mornings",
  /** Used in footer + structured data hints; swap for production URLs. */
  social: {
    instagram: "https://www.instagram.com",
    tiktok: "https://www.tiktok.com",
    maps: "https://maps.google.com",
  },
  hours: [
    { day: "Mon – Fri", hours: "7:00 – 18:00" },
    { day: "Sat – Sun", hours: "8:00 – 17:00" },
  ],
  address: "128 Orchard Lane, Seattle",
} as const;
