import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteShell } from "@/components/layout/SiteShell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://umihouse.local"),
  title: {
    default: "Umi House · Asian Café Ordering",
    template: "%s · Umi House",
  },
  description:
    "Order crafted coffees, teas, and pastries from Umi House — modern Asian café rituals with headless WordPress content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${fraunces.variable} bg-[color:var(--background)] font-sans text-[color:var(--foreground)] antialiased`}
      >
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
