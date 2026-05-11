import { create } from "zustand";

/** UI-only state kept separate from persisted cart to avoid hydration churn. */
interface UiState {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
}));
