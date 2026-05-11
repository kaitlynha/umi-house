import { MenuGridSkeleton } from "@/components/menu/LoadingSkeleton";

export default function MenuLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="h-4 w-40 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="h-10 max-w-xl animate-pulse rounded-full bg-stone-100 dark:bg-stone-900" />
      </div>
      <MenuGridSkeleton count={6} />
    </div>
  );
}
