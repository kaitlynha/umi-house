"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { cartSubtotalCents, useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { formatCurrencyFromCents } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUiStore();
  const [mounted, setMounted] = useState(false);
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!cartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cartOpen, setCartOpen]);

  const subtotal = cartSubtotalCents(lines);

  const drawer = (
    <AnimatePresence>
      {cartOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col border-l border-stone-200/70 bg-[color:var(--background)] shadow-[0_0_80px_-30px_rgba(28,25,23,0.75)] dark:border-white/10"
          >
            <div className="flex items-center justify-between border-b border-stone-200/70 px-6 py-5 dark:border-white/10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
                  Your order
                </p>
                <h2
                  id="cart-drawer-title"
                  className="umi-display text-2xl text-foreground"
                >
                  Cart
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-stone-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition hover:border-foreground hover:text-foreground dark:border-white/15 dark:hover:border-white dark:hover:text-foreground"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-stone-300/80 bg-[color:var(--card)] p-8 text-center text-sm text-muted dark:border-white/15">
                  Your cart is resting — add a seasonal pour or pastry to begin.
                </div>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li
                      key={line.itemId}
                      className="flex gap-4 rounded-3xl border border-stone-200/70 bg-[color:var(--card)] p-4 shadow-sm dark:border-white/10 dark:bg-[color:color-mix(in_oklab,var(--card)_82%,black)]"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-stone-100 dark:bg-[color:color-mix(in_oklab,var(--card)_60%,black)]">
                        {line.item.imageUrl ? (
                          <Image
                            src={line.item.imageUrl}
                            alt={line.item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="flex flex-1 flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-foreground">
                              {line.item.name}
                            </p>
                            <p className="text-xs uppercase tracking-[0.25em] text-muted">
                              {line.item.category}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="text-xs font-semibold uppercase tracking-[0.2em] text-muted/80 underline-offset-4 hover:text-accent hover:underline"
                            onClick={() => removeItem(line.itemId)}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center rounded-full border border-stone-200/80 bg-white px-2 py-1 text-sm text-foreground dark:border-white/15 dark:bg-[color:color-mix(in_oklab,var(--background)_90%,white)]">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="px-2 text-lg leading-none"
                              onClick={() =>
                                setQuantity(line.itemId, line.quantity - 1)
                              }
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="px-2 text-lg leading-none"
                              onClick={() =>
                                setQuantity(line.itemId, line.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {formatCurrencyFromCents(
                              line.item.priceCents * line.quantity,
                            )}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-stone-200/70 px-6 py-6 dark:border-white/10">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span className="text-lg font-semibold text-foreground">
                  {formatCurrencyFromCents(subtotal)}
                </span>
              </div>
              <button
                type="button"
                disabled={lines.length === 0}
                onClick={() => {
                  toast.success(
                    "Checkout integrates with WooCommerce or Stripe — cart stays intact for now.",
                  );
                  setCartOpen(false);
                }}
                className="mt-4 w-full rounded-full bg-[color:var(--surface-primary)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--btn-fg)] shadow-lg transition enabled:hover:-translate-y-0.5 enabled:hover:bg-[color:var(--surface-primary-hover)] disabled:cursor-not-allowed disabled:bg-muted/40 disabled:text-muted dark:disabled:bg-muted/20 dark:disabled:text-muted"
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(drawer, document.body);
}
