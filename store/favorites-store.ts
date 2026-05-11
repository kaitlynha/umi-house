import type { MenuItem } from "@/types/menu";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  ids: string[];
  toggleFavorite: (item: MenuItem) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggleFavorite: (item) => {
        const exists = get().ids.includes(item.id);
        set({
          ids: exists
            ? get().ids.filter((id) => id !== item.id)
            : [...get().ids, item.id],
        });
      },
    }),
    {
      name: "umihouse-favorites",
      version: 1,
    },
  ),
);
