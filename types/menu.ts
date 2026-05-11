/**
 * Application-facing menu model. Decoupled from WordPress payloads so the UI and cart
 * stay stable even if the CMS schema shifts (ACF keys, taxonomies, embed shape).
 */
export type MenuCategorySlug = "coffee" | "tea" | "pastries" | "seasonal";

export interface MenuItem {
  /** Stable client id (WP id as string, or synthetic for fallback data). */
  id: string;
  wpId?: number;
  slug: string;
  name: string;
  description: string;
  /** Stored in minor currency units to avoid float drift in totals. */
  priceCents: number;
  category: MenuCategorySlug;
  imageUrl: string | null;
}

export interface MenuCategoryMeta {
  slug: MenuCategorySlug;
  label: string;
  description: string;
}
