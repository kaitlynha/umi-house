"use client";

import { useEffect, useState } from "react";

/** Keeps fast keystrokes from thrashing filtered grids while staying responsive. */
export function useDebouncedValue<T>(value: T, delayMs = 220) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
}
