export function MenuCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-stone-200/60 bg-white/70 dark:border-white/10 dark:bg-stone-900/70">
      <div className="aspect-[4/3] bg-stone-200/80 dark:bg-stone-800" />
      <div className="space-y-3 p-6">
        <div className="h-4 w-2/3 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="h-3 w-full rounded-full bg-stone-100 dark:bg-stone-800/80" />
        <div className="h-3 w-5/6 rounded-full bg-stone-100 dark:bg-stone-800/80" />
      </div>
    </div>
  );
}

export function MenuGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <MenuCardSkeleton key={index} />
      ))}
    </div>
  );
}
