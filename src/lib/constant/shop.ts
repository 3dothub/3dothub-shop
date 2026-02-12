import type { Product } from "@/lib/types/product";

export const siteConfig = {
  name: "3DotWraps",
  tagline: "Curated gifts for every celebration",
  searchPlaceholder: "Search gifts, frames, tiny art",
  defaultImage: "/image%205.png",
};

export const navLinks = ["Shop", "Products", "Occasions", "Gift Guide"];

export const colorTokens = {
  light: {
    appBg: "#f4faf8",
    appFg: "#0f2f2a",
    surface: "#ffffff",
    surfaceStrong: "#e9f3f0",
    muted: "#4b6b66",
    accent: "#0d6f63",
    accentStrong: "#0a5a50",
    border: "rgba(15, 47, 42, 0.08)",
    glass: "rgba(255, 255, 255, 0.85)",
    heroBg: "#0d6f63",
    heroFg: "#ffffff",
    heroMuted: "#d7f1eb",
  },
  dark: {
    appBg: "#0a1b18",
    appFg: "#ecfdf9",
    surface: "#0f2521",
    surfaceStrong: "#12312c",
    muted: "#9bb6b1",
    accent: "#38b2a8",
    accentStrong: "#62d4c8",
    border: "rgba(98, 212, 200, 0.25)",
    glass: "rgba(15, 37, 33, 0.72)",
    heroBg: "#0f2521",
    heroFg: "#ecfdf9",
    heroMuted: "#bfe7df",
  },
} as const;

export const announcement = {
  eyebrow: "Valentine's Day Special",
  title: "Happiness blooms from within",
  description:
    "Handcrafted frames, tiny art, and keepsakes made to celebrate love, birthdays, and weddings.",
  ctaPrimary: "Shop Valentine's Offers",
  ctaSecondary: "Explore gifts",
};

export const heroHighlights = [
  "Custom photo frames",
  "Tiny art miniatures",
  "Wedding gifts",
  "Birthday surprise boxes",
];

export const heroGallery = {
  smallTop: "/image%209.png",
  smallBottom: "/image%208.png",
  featured: "/image%205.png",
  main: "/image-main.png",
};

export const heroTiles = [
  { title: "Wedding keepsakes", subtitle: "Curated for new beginnings" },
  { title: "Birthday surprises", subtitle: "Made to spark smiles" },
  { title: "Photo frames", subtitle: "Personalized moments" },
  { title: "Tiny art", subtitle: "Hand-finished details" },
];

export const featuredItems = [
  {
    title: "Peperomia Ginny Frame",
    price: 25,
    subtitle: "Photo frame",
    image: "/image%2012.png",
  },
  {
    title: "Bird's Nest Fern Keepsake",
    price: 45,
    subtitle: "Tiny art",
    image: "/image%2013.png",
  },
  {
    title: "Majesty Palm Wedding Box",
    price: 52,
    subtitle: "Wedding gift",
    image: "/image%2011.png",
  },
  {
    title: "Pet Friendly Plant Bundle",
    price: 30,
    subtitle: "Birthday gift",
    image: "/image%2010.png",
  },
];

export const arrivals = [
  { title: "Blue Lily", subtitle: "more information", image: "/image%2016.png" },
  { title: "Iris Bloom", subtitle: "more information", image: "/image%2017.png" },
  { title: "Purple Glow", subtitle: "more information", image: "/image%2015.png" },
  { title: "Crimson Love", subtitle: "more information", image: "/image%2010.png" },
];

export const stands = [
  { title: "Hanging Frame", subtitle: "more", image: "/image%2013.png" },
  { title: "Macrame Holder", subtitle: "more", image: "/image%2011.png" },
  { title: "Gift Pack", subtitle: "more", image: "/image%2012.png" },
];

export const shippingBanner = {
  title: "Free Shipping Services",
  description: "For orders above ₹999",
  line1: "+91 98765 43210",
  line2: "hello@3dothub.gifts",
};

export const locationInfo = {
  title: "Visit us",
  address: "Nehru Market, New Delhi",
  hours: "Open 10am - 8pm every day",
  mapImage: "/Maps.png",
};

export const giftCollections = [
  {
    title: "Colorful new arrivals",
    action: "View all",
    items: [
      "Royal Wedding Photo Frame",
      "Tiny Art Couple Keepsake",
      "Mehendi Moment Shadow Box",
      "Birthday Glow Hamper",
    ],
  },
  {
    title: "Signature gift edits",
    action: "Explore",
    items: [
      "Heritage Wedding Vows Frame",
      "Miniature Mandala Art",
      "Celebration Memory Box",
      "Sangeet Night Photo Collage",
    ],
  },
];

export const featuredProducts: Product[] = [
  {
    _id: "gift-001",
    title: "Royal Wedding Photo Frame",
    price: 2899,
    category: "Wedding Gift",
    rating: 4.8,
    stock: 22,
    imageUrl: "/image.png",
  },
  {
    _id: "gift-002",
    title: "Tiny Art Couple Keepsake",
    price: 1499,
    category: "Tiny Art",
    rating: 4.7,
    stock: 18,
    imageUrl: "/image.png",
  },
  {
    _id: "gift-003",
    title: "Mehendi Moment Shadow Box",
    price: 2199,
    category: "Photo Frame",
    rating: 4.6,
    stock: 12,
    imageUrl: "/image.png",
  },
  {
    _id: "gift-004",
    title: "Birthday Glow Hamper",
    price: 1799,
    category: "Birthday Gift",
    rating: 4.5,
    stock: 30,
    imageUrl: "/image.png",
  },
  {
    _id: "gift-005",
    title: "Heritage Wedding Vows Frame",
    price: 2599,
    category: "Wedding Gift",
    rating: 4.9,
    stock: 10,
    imageUrl: "/image.png",
  },
  {
    _id: "gift-006",
    title: "Miniature Mandala Art",
    price: 999,
    category: "Tiny Art",
    rating: 4.4,
    stock: 28,
    imageUrl: "/image.png",
  },
  {
    _id: "gift-007",
    title: "Celebration Memory Box",
    price: 1899,
    category: "Birthday Gift",
    rating: 4.6,
    stock: 16,
    imageUrl: "/image.png",
  },
  {
    _id: "gift-008",
    title: "Sangeet Night Photo Collage",
    price: 2399,
    category: "Photo Frame",
    rating: 4.7,
    stock: 14,
    imageUrl: "/image.png",
  },
];
