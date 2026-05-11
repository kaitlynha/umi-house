"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,_rgba(31,107,72,0.2),_transparent_55%),radial-gradient(ellipse_90%_60%_at_80%_100%,_rgba(90,74,58,0.12),_transparent_50%),linear-gradient(180deg,_rgba(233,242,235,0.65)_0%,_transparent_42%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,_rgba(110,222,154,0.16),_transparent_55%),radial-gradient(ellipse_90%_55%_at_70%_110%,_rgba(61,52,44,0.35),_transparent_45%)]"
      />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-white/90 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted shadow-sm backdrop-blur dark:border-white/10 dark:bg-[color:var(--card)]/85">
            Now pouring · Seasonal sakura menu
          </p>

          <div className="space-y-4">
            <h1 className="umi-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Soft light, slow pours,
              <span className="block text-accent">
                bold Asian flavors.
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              {SITE.tagline}. Thoughtfully sourced teas, espresso with koji-kissed
              sweetness, and pastries laminated daily.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--surface-primary)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--btn-fg)] shadow-[0_22px_55px_-28px_rgba(31,107,72,0.35)] transition hover:-translate-y-0.5 hover:bg-[color:var(--surface-primary-hover)]"
            >
              Explore menu
            </Link>
            <Link
              href="/menu#seasonal"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-white/90 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] dark:border-white/15 dark:bg-[color:var(--card)]/90"
            >
              Seasonal picks
            </Link>
          </div>

          <dl className="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Roast style", value: "Omni · Kyoto curves" },
              { label: "Steep time", value: "Gongfu service" },
              { label: "Bake cadence", value: "Hourly laminated" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[color:var(--border-subtle)] bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[color:var(--card)]/75">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-medium text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-[32px] border border-[color:var(--border-subtle)] bg-gradient-to-br from-white via-[color:var(--card)] to-emerald-50/35 shadow-[0_40px_120px_-60px_var(--shadow-soft)] dark:border-white/10 dark:from-[color:var(--card)] dark:via-[color:var(--background)] dark:to-[color:var(--card)]">
            <div className="absolute inset-6 rounded-[26px] bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center shadow-inner" />
            <div className="absolute inset-x-8 bottom-8 rounded-3xl border border-white/40 bg-white/70 p-5 text-sm text-foreground shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[color:color-mix(in_oklab,var(--card)_88%,black)]">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                Bar ritual
              </p>
              <p className="mt-2 umi-display text-xl text-foreground">
                Smoked chestnut cortado
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Pulled on a mellow roast with oat koji foam — warming, nutty, precise.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
