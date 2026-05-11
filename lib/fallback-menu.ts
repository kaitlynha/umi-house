import type { MenuItem } from "@/types/menu";

/**
 * Portfolio-safe catalog when WordPress is offline or env is unset.
 * Mirrors the shape returned by `mapWpPostToMenuItem` so UI code stays single-path.
 */
export function getFallbackMenu(): MenuItem[] {
  return [
    {
      id: "fb-1",
      slug: "umi-latte",
      name: "Umi Latte",
      description:
        "Double espresso, toasted oat milk, black sugar shimmer, and sea salt foam.",
      priceCents: 595,
      category: "coffee",
      imageUrl:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "fb-2",
      slug: "yuzu-americano",
      name: "Yuzu Americano",
      description:
        "Slow drip espresso brightened with chilled yuzu peel syrup.",
      priceCents: 525,
      category: "coffee",
      imageUrl:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "fb-3",
      slug: "hojicha-swirl",
      name: "Hojicha Swirl",
      description:
        "Roasted green tea with vanilla oat foam and black sesame brittle.",
      priceCents: 615,
      category: "tea",
      imageUrl:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "fb-4",
      slug: "osmanthus-oolong",
      name: "Osmanthus Oolong",
      description:
        "Whole-leaf Tieguanyin steeped with dried osmanthus blossoms.",
      priceCents: 495,
      category: "tea",
      imageUrl:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "fb-5",
      slug: "matcha-croissant",
      name: "Matcha Croissant",
      description:
        "Laminated pastry with ceremonial-grade matcha crémeux.",
      priceCents: 545,
      category: "pastries",
      imageUrl:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "fb-6",
      slug: "black-sesame-financier",
      name: "Black Sesame Financier",
      description:
        "Nutty brown butter cake glazed with koji caramel.",
      priceCents: 425,
      category: "pastries",
      imageUrl:
        "https://images.unsplash.com/photo-1614707267537-ad77cf43ce53?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "fb-7",
      slug: "sakura-soda-float",
      name: "Sakura Soda Float",
      description:
        "Cherry blossom syrup, sparkling yuzu, vanilla koji ice cream.",
      priceCents: 685,
      category: "seasonal",
      imageUrl:
        "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "fb-8",
      slug: "smoked-plum-cold-brew",
      name: "Smoked Plum Cold Brew",
      description:
        "48-hour steep with lapsang and preserved plum reduction.",
      priceCents: 645,
      category: "seasonal",
      imageUrl:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    },
  ];
}
