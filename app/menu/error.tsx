"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
        Menu unavailable
      </p>
      <h1 className="umi-display text-4xl text-foreground">
        We couldn&apos;t hydrate the menu grid.
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        {error.message ||
          "An unexpected error occurred while rendering the menu page."}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-[color:var(--surface-primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--btn-fg)] shadow-lg transition hover:-translate-y-0.5 hover:bg-[color:var(--surface-primary-hover)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-[color:var(--border-subtle)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition hover:border-[color:var(--surface-primary)] hover:bg-[color:var(--surface-primary)] hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-foreground"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
