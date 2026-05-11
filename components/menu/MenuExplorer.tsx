"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { MenuItem } from "@/types/menu";
import { MENU_CATEGORIES } from "@/lib/constants";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { CategoryFilter, type CategorySelection } from "./CategoryFilter";
import { MenuCard } from "./MenuCard";
import { SearchBar } from "./SearchBar";

interface MenuExplorerProps {
  items: MenuItem[];
  /** Surface CMS connectivity issues without blocking ordering flows. */
  warning?: string;
}

export function MenuExplorer({ items, warning }: MenuExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategorySelection>("all");
  const debouncedSearch = useDebouncedValue(search.toLowerCase(), 200);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        category === "all" ? true : item.category === category;
      const haystack = `${item.name} ${item.description}`.toLowerCase();
      const matchesSearch =
        debouncedSearch.trim().length === 0
          ? true
          : haystack.includes(debouncedSearch.trim());
      return matchesCategory && matchesSearch;
    });
  }, [items, category, debouncedSearch]);

  return (
    <div className="space-y-10">
      {warning ? (
        <div
          role="status"
          className="rounded-3xl border border-emerald-200/70 bg-emerald-50/90 px-5 py-4 text-sm text-emerald-950 shadow-sm dark:border-emerald-500/35 dark:bg-emerald-950/35 dark:text-emerald-50"
        >
          {warning}
        </div>
      ) : null}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-5 rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--card)] p-6 shadow-inner dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
            Categories
          </p>
          <div className="space-y-4">
            {MENU_CATEGORIES.map((entry) => (
              <div key={entry.slug} id={entry.slug === "seasonal" ? "seasonal" : undefined}>
                <p className="umi-display text-lg text-foreground">
                  {entry.label}
                </p>
                <p className="text-sm text-muted">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <section aria-live="polite" className="space-y-8">
          <header className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
              Menu
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h1 className="umi-display text-4xl text-foreground">
                Brewed with intention
              </h1>
              <p className="text-sm text-muted">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filtered.length}
                </span>{" "}
                items
              </p>
            </div>
          </header>

          <AnimatePresence mode="popLayout">
            {filtered.length ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 md:grid-cols-2"
              >
                {filtered.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-3xl border border-dashed border-[color:var(--border-subtle)] bg-white/80 p-10 text-center dark:border-white/20 dark:bg-[color:color-mix(in_oklab,var(--card)_88%,transparent)]"
              >
                <p className="umi-display text-2xl text-foreground">
                  Nothing matches just yet
                </p>
                <p className="mt-3 text-sm text-muted">
                  Try another keyword or reset filters to browse the full menu.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
