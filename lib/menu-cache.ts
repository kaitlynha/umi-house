import { cache } from "react";
import { getMenuItems, loadMenuCatalog } from "@/services/wordpress/menu";

/**
 * React `cache` dedupes catalog fetches within a single request — hero + menu routes stay cheap.
 */
export const getCachedMenuItems = cache(getMenuItems);
export const getCachedMenuCatalog = cache(loadMenuCatalog);
