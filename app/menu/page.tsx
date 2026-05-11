import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { getCachedMenuCatalog } from "@/lib/menu-cache";

export default async function MenuPage() {
  const catalog = await getCachedMenuCatalog();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <MenuExplorer items={catalog.items} warning={catalog.warning} />
    </div>
  );
}
