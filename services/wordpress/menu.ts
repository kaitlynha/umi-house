import { getFallbackMenu } from "@/lib/fallback-menu";
import { stripHtml } from "@/lib/utils";
import type { MenuCategorySlug, MenuItem } from "@/types/menu";
import type { WPMenuPost } from "@/types/wordpress";
import { WordPressRequestError, wpFetch } from "./client";

const MENU_POST_TYPE =
  process.env.NEXT_PUBLIC_WORDPRESS_MENU_POST_TYPE ?? "menu_item";

const VALID_CATEGORIES: MenuCategorySlug[] = [
  "coffee",
  "tea",
  "pastries",
  "seasonal",
];

function parsePriceToCents(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.round(raw * 100);
  }
  if (typeof raw === "string") {
    const normalized = raw.replace(/[^0-9.]/g, "");
    const value = Number.parseFloat(normalized);
    if (!Number.isFinite(value)) return null;
    return Math.round(value * 100);
  }
  return null;
}

function normalizeCategory(raw: unknown): MenuCategorySlug | null {
  if (typeof raw !== "string") return null;
  const slug = raw.trim().toLowerCase().replace(/\s+/g, "_");
  const aliases: Record<string, MenuCategorySlug> = {
    coffee: "coffee",
    tea: "tea",
    pastry: "pastries",
    pastries: "pastries",
    seasonal: "seasonal",
    seasonal_drinks: "seasonal",
    "seasonal-drinks": "seasonal",
  };
  return aliases[slug] ?? (VALID_CATEGORIES.includes(slug as MenuCategorySlug)
    ? (slug as MenuCategorySlug)
    : null);
}

function featuredImageFromEmbedded(post: WPMenuPost): string | null {
  const embedded = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return embedded ?? null;
}

/**
 * Maps a WordPress post payload into our catalog model.
 * Adjust `acf` keys to match your CMS field names without touching UI components.
 */
export function mapWpPostToMenuItem(post: WPMenuPost): MenuItem | null {
  const acf =
    post.acf && typeof post.acf === "object" ? post.acf : ({} as Record<string, unknown>);

  const category =
    normalizeCategory(acf.category ?? acf.menu_category ?? acf.section) ??
    "coffee";

  const price =
    parsePriceToCents(acf.price ?? acf.menu_price ?? acf.cost) ?? 890;

  const descriptionSource =
    post.excerpt?.rendered ?? post.content?.rendered ?? "";

  return {
    id: String(post.id),
    wpId: post.id,
    slug: post.slug,
    name: stripHtml(post.title.rendered),
    description: stripHtml(descriptionSource) || "Chef-curated seasonal selection.",
    priceCents: price,
    category,
    imageUrl: featuredImageFromEmbedded(post),
  };
}

async function fetchRemoteMenu(): Promise<MenuItem[]> {
  const query = new URLSearchParams({
    per_page: "100",
    _embed: "1",
    orderby: "date",
    order: "desc",
  });

  const path = `/wp-json/wp/v2/${MENU_POST_TYPE}?${query.toString()}`;
  const payload = await wpFetch<WPMenuPost[]>(path, {
    next: { revalidate: 120 },
  });

  const mapped = payload
    .map(mapWpPostToMenuItem)
    .filter((item): item is MenuItem => Boolean(item));

  if (!mapped.length) {
    throw new WordPressRequestError("WordPress returned zero menu items");
  }

  return mapped;
}

export type MenuFetchResult = {
  source: "wordpress" | "fallback";
  items: MenuItem[];
  warning?: string;
};

function useLocalCatalogOnly() {
  return process.env.NEXT_PUBLIC_USE_LOCAL_MENU === "true";
}

/**
 * Primary data loader for the menu route. Never throws — callers render UX off `source`.
 * Fallback protects demos and local portfolios when CPTs are not configured yet.
 */
export async function loadMenuCatalog(): Promise<MenuFetchResult> {
  // Explicit local-only mode: no network calls, catalog from `lib/fallback-menu.ts`.
  if (useLocalCatalogOnly()) {
    return { source: "fallback", items: getFallbackMenu() };
  }

  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    return {
      source: "fallback",
      items: getFallbackMenu(),
      warning:
        "WordPress URL missing — showing curated offline catalog for demos.",
    };
  }

  try {
    const items = await fetchRemoteMenu();
    return { source: "wordpress", items };
  } catch (error) {
    const message =
      error instanceof WordPressRequestError
        ? error.message
        : "Unexpected WordPress failure";

    return {
      source: "fallback",
      items: getFallbackMenu(),
      warning: `${message} · Showing offline catalog.`,
    };
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const result = await loadMenuCatalog();
  return result.items;
}
