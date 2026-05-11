"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/types/menu";
import { formatCurrencyFromCents } from "@/lib/utils";

interface FeaturedDrinksProps {
  items: MenuItem[];
}

export function FeaturedDrinks({ items }: FeaturedDrinksProps) {
  return (
    <section className="border-y border-[color:var(--border-subtle)] bg-[color:var(--card)] px-4 py-16 dark:border-white/10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
              Featured pours
            </p>
            <h2 className="mt-3 umi-display text-3xl text-foreground sm:text-4xl">
              Bright teas, slow espresso, pastry pairings.
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            View full menu →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-white shadow-[0_25px_65px_-48px_var(--shadow-soft)] transition hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--accent)_18%,transparent)] hover:shadow-[0_35px_80px_-42px_var(--shadow-soft)] dark:border-white/10 dark:bg-[color:var(--card)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[color:var(--card)] text-sm text-muted dark:bg-[color:color-mix(in_oklab,var(--card)_70%,black)]">
                    Photo coming soon
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="umi-display text-xl text-foreground">
                    {item.name}
                  </h3>
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrencyFromCents(item.priceCents)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
