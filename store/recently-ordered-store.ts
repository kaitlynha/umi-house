import type { MenuItem } from "@/types/menu";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_ITEMS = 6;

interface RecentlyOrderedState {
  /** FIFO deduped list of catalog ids */
  ids: string[];
  /** Lightweight snapshots for homepage rendering without extra fetches */
  snapshots: Record<string, Pick<MenuItem, "id" | "name" | "priceCents" | "slug">>;
  recordOrderInterest: (item: MenuItem) => void;
}

export const useRecentlyOrderedStore = create<RecentlyOrderedState>()(
  persist(
    (set, get) => ({
      ids: [],
      snapshots: {},
      recordOrderInterest: (item) => {
        const filtered = get().ids.filter((id) => id !== item.id);
        const ids = [item.id, ...filtered].slice(0, MAX_ITEMS);
        const snapshots = {
          ...get().snapshots,
          [item.id]: {
            id: item.id,
            name: item.name,
            priceCents: item.priceCents,
            slug: item.slug,
          },
        };
        set({ ids, snapshots });
      },
    }),
    {
      name: "umihouse-recent",
      version: 1,
      partialize: (state) => ({
        ids: state.ids,
        snapshots: state.snapshots,
      }),
    },
  ),
);
