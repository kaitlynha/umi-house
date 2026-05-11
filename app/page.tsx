import { FeaturedDrinks } from "@/components/home/FeaturedDrinks";
import { HeroSection } from "@/components/home/HeroSection";
import { RecentlyOrdered } from "@/components/home/RecentlyOrdered";
import { getCachedMenuItems } from "@/lib/menu-cache";
import { pickFeaturedItems } from "@/lib/featured";

export default async function HomePage() {
  const catalog = await getCachedMenuItems();
  const featured = pickFeaturedItems(catalog, 3);

  return (
    <>
      <HeroSection />
      <FeaturedDrinks items={featured} />
      <RecentlyOrdered />
    </>
  );
}
