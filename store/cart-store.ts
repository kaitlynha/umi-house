import type { MenuItem } from "@/types/menu";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  itemId: string;
  quantity: number;
  /** Snapshot of catalog data at add-time — keeps drawer resilient if CMS reshapes. */
  item: MenuItem;
}

interface CartState {
  lines: CartLine[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (item, quantity = 1) => {
        const lines = get().lines;
        const existing = lines.find((line) => line.itemId === item.id);
        if (existing) {
          set({
            lines: lines.map((line) =>
              line.itemId === item.id
                ? { ...line, quantity: line.quantity + quantity }
                : line,
            ),
          });
          return;
        }

        set({
          lines: [
            ...lines,
            { itemId: item.id, quantity, item: { ...item } },
          ],
        });
      },
      removeItem: (itemId) =>
        set({ lines: get().lines.filter((line) => line.itemId !== itemId) }),
      setQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((line) => line.itemId !== itemId) });
          return;
        }

        set({
          lines: get().lines.map((line) =>
            line.itemId === itemId ? { ...line, quantity } : line,
          ),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    {
      name: "umihouse-cart",
      version: 2,
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export function cartSubtotalCents(lines: CartLine[]) {
  return lines.reduce(
    (total, line) => total + line.item.priceCents * line.quantity,
    0,
  );
}
