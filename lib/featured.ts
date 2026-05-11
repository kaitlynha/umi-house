import type { MenuItem } from "@/types/menu";

/** Prioritizes seasonal + coffee pours so the homepage feels curated, not random. */
export function pickFeaturedItems(items: MenuItem[], limit = 3) {
  const seasonal = items.filter((item) => item.category === "seasonal");
  const coffee = items.filter((item) => item.category === "coffee");
  const remainder = items.filter(
    (item) => item.category !== "seasonal" && item.category !== "coffee",
  );

  const merged = [...seasonal, ...coffee, ...remainder];
  const deduped = Array.from(new Map(merged.map((item) => [item.id, item])).values());

  return deduped.slice(0, limit);
}
