"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRecentlyOrderedStore } from "@/store/recently-ordered-store";
import { formatCurrencyFromCents } from "@/lib/utils";

/** Client-only strip — reads persisted snapshots without blocking SSR shell rendering. */
export function RecentlyOrdered() {
  const ids = useRecentlyOrderedStore((state) => state.ids);
  const snapshots = useRecentlyOrderedStore((state) => state.snapshots);

  const rows = useMemo(
    () =>
      ids
        .map((id) => snapshots[id])
        .filter(Boolean),
    [ids, snapshots],
  );

  if (!rows.length) return null;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-dashed border-[color:color-mix(in_oklab,var(--accent)_28%,transparent)] bg-white/85 p-8 shadow-inner backdrop-blur dark:border-emerald-500/25 dark:bg-[color:var(--card)]/90">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
              Recently ordered
            </p>
            <h2 className="mt-2 umi-display text-2xl text-foreground">
              Pick up where you left off
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-subtle)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-[color:var(--surface-primary)] hover:bg-[color:var(--surface-primary)] hover:text-white dark:border-white/20 dark:hover:border-white dark:hover:bg-white dark:hover:text-foreground"
          >
            Browse menu
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-2xl border border-stone-200/70 bg-[color:var(--card)] px-4 py-3 dark:border-white/10"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-foreground">
                  {row.name}
                </p>
                <span className="text-sm font-semibold text-muted">
                  {formatCurrencyFromCents(row.priceCents)}
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted/70">
                {row.slug}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
