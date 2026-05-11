"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import type { MenuItem } from "@/types/menu";
import { formatCurrencyFromCents } from "@/lib/utils";
import { MENU_CATEGORIES } from "@/lib/constants";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { useRecentlyOrderedStore } from "@/store/recently-ordered-store";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.ids.includes(item.id));
  const recordRecent = useRecentlyOrderedStore(
    (state) => state.recordOrderInterest,
  );

  const categoryLabel =
    MENU_CATEGORIES.find((entry) => entry.slug === item.category)?.label ??
    item.category;

  const handleAdd = () => {
    addItem(item, 1);
    recordRecent(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-white shadow-[0_28px_70px_-48px_var(--shadow-soft)] transition hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--accent)_22%,transparent)] hover:shadow-[0_38px_90px_-42px_var(--shadow-soft)] dark:border-white/10 dark:bg-[color:var(--card)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[color:var(--card)] to-emerald-50/50 text-sm text-muted dark:from-[color:color-mix(in_oklab,var(--card)_55%,black)] dark:to-[color:color-mix(in_oklab,var(--background)_70%,black)]">
            Visual incoming
          </div>
        )}

        <button
          type="button"
          aria-pressed={isFavorite}
          aria-label={
            isFavorite ? `Remove ${item.name} from favorites` : `Save ${item.name}`
          }
          onClick={() => toggleFavorite(item)}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-lg text-accent shadow-md backdrop-blur transition hover:scale-105 dark:bg-[color:color-mix(in_oklab,var(--background)_85%,white)] dark:text-accent-muted"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
              {categoryLabel}
            </p>
            <h3 className="umi-display mt-2 text-2xl text-foreground">
              {item.name}
            </h3>
          </div>
          <p className="text-base font-semibold text-foreground">
            {formatCurrencyFromCents(item.priceCents)}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          {item.description}
        </p>

        <div className="mt-auto flex gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[color:var(--surface-primary)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--btn-fg)] shadow-lg transition hover:-translate-y-0.5 hover:bg-[color:var(--surface-primary-hover)]"
          >
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
