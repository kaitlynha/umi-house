import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-[color:var(--card)] py-12 text-sm text-muted dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <p className="umi-display text-xl text-foreground">
            {SITE.name}
          </p>
          <p className="max-w-xs leading-relaxed">{SITE.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Visit
          </p>
          <p className="mt-3 leading-relaxed">{SITE.address}</p>
          <Link
            href={SITE.social.maps}
            className="mt-3 inline-flex text-accent underline-offset-4 hover:underline"
          >
            Open in Maps
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Hours
          </p>
          <ul className="mt-3 space-y-2">
            {SITE.hours.map((row) => (
              <li key={row.day} className="flex justify-between gap-6">
                <span>{row.day}</span>
                <span className="font-medium text-foreground">
                  {row.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Social
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href={SITE.social.instagram}
                className="transition hover:text-foreground"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href={SITE.social.tiktok}
                className="transition hover:text-foreground"
              >
                TikTok
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-muted/70 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {SITE.name}. Crafted for calm mornings.
      </p>
    </footer>
  );
}
