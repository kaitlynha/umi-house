"use client";

import type { MenuCategorySlug } from "@/types/menu";
import { MENU_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type CategorySelection = "all" | MenuCategorySlug;

interface CategoryFilterProps {
  value: CategorySelection;
  onChange: (value: CategorySelection) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const options: { slug: CategorySelection; label: string }[] = [
    { slug: "all", label: "All" },
    ...MENU_CATEGORIES.map((category) => ({
      slug: category.slug,
      label: category.label,
    })),
  ];

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const selected = value === option.slug;
        return (
          <button
            key={option.slug}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.slug)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
              selected
                ? "bg-[color:var(--surface-primary)] text-[color:var(--btn-fg)] shadow-md"
                : "border border-stone-200/70 bg-white/70 text-muted hover:border-stone-300 hover:text-foreground dark:border-white/10 dark:bg-[color:color-mix(in_oklab,var(--card)_75%,black)] dark:hover:border-white/30 dark:hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
