"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ value, onChange, className }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label
      className={cn(
        "flex w-full items-center gap-3 rounded-full border border-[color:color-mix(in_oklab,var(--accent)_15%,var(--border-subtle))] bg-white px-4 py-2 shadow-inner backdrop-blur dark:border-white/10 dark:bg-[color:var(--card)]/80",
        className,
      )}
    >
      <span aria-hidden className="text-muted/80">
        ⌕
      </span>
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search drinks or pastries"
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
      />
    </label>
  );
}
