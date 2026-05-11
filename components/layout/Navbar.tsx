"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) =>
    state.lines.reduce((sum, line) => sum + line.quantity, 0),
  );
  const { cartOpen, setCartOpen } = useUiStore();

  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-[color:var(--border-subtle)] bg-[color-mix(in_oklab,var(--background)_92%,transparent)] shadow-[0_10px_40px_-28px_var(--shadow-soft)] backdrop-blur-xl dark:border-white/10"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-tight transition-opacity hover:opacity-80"
        >
          <span className="umi-display text-lg tracking-tight text-foreground sm:text-xl">
            {SITE.name}
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.35em] text-muted sm:inline">
            Café · Kitchen · Bakery
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 rounded-full border border-stone-200/80 bg-white/70 p-1 shadow-sm dark:border-white/10 dark:bg-stone-900/70 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1 text-xs font-semibold text-foreground transition hover:bg-[color:var(--surface-primary)] hover:text-white dark:hover:bg-white dark:hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md dark:border-white/10 dark:bg-[color:color-mix(in_oklab,var(--card)_80%,black)]",
            )}
            aria-label="Toggle dark mode"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {mounted ? (theme === "dark" ? "☾" : "☀") : "◐"}
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(!cartOpen)}
            className="relative inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--btn-fg)] shadow-[0_15px_35px_-18px_rgba(31,107,72,0.35)] transition hover:-translate-y-0.5 hover:bg-[color:var(--surface-primary-hover)]"
          >
            Cart
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-2 text-[11px] font-bold dark:bg-stone-950/25">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
