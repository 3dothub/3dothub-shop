import type { Document } from "mongodb";
import { getDb } from "@/lib/database/mongodb";
import type {
  ComboProduct,
  FooterInfo,
  HeaderSection,
  HeroSlide,
  ListResponse,
  OccasionCard,
  QuickCategory,
  RecipientCard,
  ShopCardProduct,
  StorefrontResponse,
} from "@/lib/types/storefront";

const DEFAULT_IMAGE_FALLBACK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const normalizeDocument = (item: Record<string, unknown>) => {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    _id:
      typeof item._id === "string"
        ? item._id
        : item._id?.toString?.() ?? undefined,
  };
};

const getCollectionItems = async (
  collectionName:
    | "products"
    | "sections"
    | "shopCategories"
    | "specialOccasions"
    | "subCategories"
): Promise<Record<string, unknown>[]> => {
  const db = await getDb();

  const collection = db.collection<Document>(collectionName);
  const docs = await collection.find().toArray();

  return docs.map((item) => normalizeDocument(item as Record<string, unknown>));
};

const toShopCard = (
  item: Record<string, unknown>,
  fallbackImage: string
): ShopCardProduct => {
  const id = String(item.id ?? item._id ?? "");
  const title = String(item.name ?? item.title ?? "Product");
  const category = String(item.category ?? "Uncategorized");
  const mrp = Number(item.mrp ?? item.pdfPrice ?? item.price ?? 0);
  const finalPrice = Number(item.finalPrice ?? item.price ?? mrp);
  const discountValue = Number(item.discount ?? 0);
  const rawImage = String(item.image ?? "").trim();
  const image = rawImage || fallbackImage;

  return {
    id,
    title,
    category,
    price: finalPrice,
    strike: mrp > finalPrice ? mrp : undefined,
    discount: discountValue > 0 ? `${discountValue}% OFF` : undefined,
    image,
  };
};

const toOccasionCard = (
  item: Record<string, unknown>,
  fallbackImage: string
): OccasionCard => ({
  id: String(item.id ?? item._id ?? ""),
  title: String(item.name ?? "Special Occasion"),
  caption: String(item.description ?? "Explore curated gift suggestions."),
  cta: "Explore now",
  image: String(item.image ?? "").trim() || fallbackImage,
});

const toHeroSlide = (
  occasion: Record<string, unknown>,
  fallbackImage: string,
  productImage?: string
): HeroSlide => ({
  title: String(occasion.name ?? "Special Collection"),
  subtitle: "Season Collection",
  description: String(
    occasion.description ?? "Explore curated products for every moment."
  ),
  image:
    (productImage && productImage.trim()) ||
    String(occasion.image ?? "").trim() ||
    fallbackImage,
});

const pickFirstImage = (...sources: Record<string, unknown>[][]) => {
  for (const source of sources) {
    for (const item of source) {
      const image = String(item.image ?? "").trim();
      if (image) {
        return image;
      }
    }
  }

  return "";
};

const normalizeText = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const formatInr = (value: number) => {
  const rounded = Math.max(0, Math.round(value));
  return rounded.toLocaleString("en-IN");
};

const sortByOrder = <T extends Record<string, unknown>>(items: T[]) =>
  [...items].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));

export const getProducts = async () => {
  const products = await getCollectionItems("products");
  return products;
};

export const getSections = async () => {
  const sections = await getCollectionItems("sections");
  return sortByOrder(sections);
};

export const getShopCategories = async () => {
  const categories = await getCollectionItems("shopCategories");
  return sortByOrder(categories);
};

export const getSpecialOccasions = async () => {
  const occasions = await getCollectionItems("specialOccasions");
  return sortByOrder(occasions);
};

export const getSubCategories = async () => {
  const subCategories = await getCollectionItems("subCategories");
  return sortByOrder(subCategories);
};

export const toListResponse = <T>(items: T[]): ListResponse<T> => ({
  items,
  total: items.length,
});

export const getStorefrontData = async (): Promise<StorefrontResponse> => {
  const [products, sections, shopCategories, specialOccasions, subCategories] =
    await Promise.all([
    getProducts(),
    getSections(),
    getShopCategories(),
    getSpecialOccasions(),
    getSubCategories(),
  ]);

  const fallbackImage =
    pickFirstImage(products, shopCategories, specialOccasions) ||
    DEFAULT_IMAGE_FALLBACK;

  const sectionTitleById = new Map(
    sections.map((item) => [
      String(item.id ?? item._id ?? ""),
      String(item.title ?? item.name ?? "Category"),
    ])
  );

  const sortedShopCategories = sortByOrder(shopCategories);
  const quickCategories: QuickCategory[] = sortedShopCategories
    .slice(0, 4)
    .map((item) => {
      const sectionId =
        String(item.sectionId ?? "") ||
        (Array.isArray(item.sectionIds) ? String(item.sectionIds[0] ?? "") : "");

      return {
        title: String(item.name ?? "Category"),
        subtitle: sectionTitleById.get(sectionId) ?? "Explore",
        image: String(item.image ?? "").trim() || fallbackImage,
      };
    });

  const trendingProducts = products
    .filter((item) => Boolean(item.isTrending))
    .slice(0, 6)
    .map((item) => toShopCard(item, fallbackImage));

  const bestSellerProducts = products
    .filter((item) => Boolean(item.isBestseller))
    .slice(0, 6)
    .map((item) => toShopCard(item, fallbackImage));

  const fallbackProducts = products
    .slice(0, 6)
    .map((item) => toShopCard(item, fallbackImage));

  const sortedOccasions = sortByOrder(specialOccasions);
  const occasionCards = sortedOccasions.map((item) =>
    toOccasionCard(item, fallbackImage)
  );

  const heroSlides: HeroSlide[] = sortedOccasions.slice(0, 2).map((occasion) => {
    const occasionName = normalizeText(occasion.name);

    const matchingProduct = products.find((product) => {
      if (!Array.isArray(product.occasions)) {
        return false;
      }

      return product.occasions.some(
        (occasionTag) => normalizeText(occasionTag) === occasionName
      );
    });

    return toHeroSlide(
      occasion,
      fallbackImage,
      String(matchingProduct?.image ?? "")
    );
  });

  const personalizedCategories = shopCategories
    .filter((item) =>
      Array.isArray(item.sectionIds)
        ? item.sectionIds.includes("sec_personalised")
        : item.sectionId === "sec_personalised"
    )
    .map((item) => String(item.name ?? ""))
    .filter(Boolean);

  const corporateCategories = shopCategories
    .filter((item) =>
      Array.isArray(item.sectionIds)
        ? item.sectionIds.includes("sec_corporate")
        : item.sectionId === "sec_corporate"
    )
    .map((item) => String(item.name ?? ""))
    .filter(Boolean);

  const occasionChips = sortedOccasions
    .map((item) => String(item.name ?? "").trim())
    .filter(Boolean)
    .slice(0, 8);

  const recipientLabelMap: Record<string, string> = {
    "for him": "For Him",
    him: "For Him",
    "for her": "For Her",
    her: "For Her",
    couples: "For Couples",
    couple: "For Couples",
    "for couples": "For Couples",
    "for kids": "For Kids",
    kids: "For Kids",
    "for parents": "For Parents",
    parents: "For Parents",
    friends: "For Friends",
  };

  const recipientChips = Array.from(
    new Set(
      products.flatMap((item) => {
        if (!Array.isArray(item.occasions)) {
          return [];
        }

        return item.occasions
          .map((tag) => recipientLabelMap[normalizeText(tag)])
          .filter(Boolean);
      })
    )
  ).slice(0, 8) as string[];

  const recipientImageMap = new Map<string, string>();
  products.forEach((item) => {
    if (!Array.isArray(item.occasions)) {
      return;
    }

    const image = String(item.image ?? "").trim() || fallbackImage;
    item.occasions.forEach((tag) => {
      const label = recipientLabelMap[normalizeText(tag)];
      if (!label) {
        return;
      }

      if (!recipientImageMap.has(label)) {
        recipientImageMap.set(label, image);
      }
    });
  });

  const recipientCards: RecipientCard[] = recipientChips.map((label) => ({
    label,
    image: recipientImageMap.get(label) || fallbackImage,
  }));

  const comboProducts: ComboProduct[] = (trendingProducts.length
    ? trendingProducts
    : fallbackProducts
  )
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    }));

  const allPrices = products
    .map((item) => Number(item.finalPrice ?? item.price ?? item.mrp ?? item.pdfPrice ?? 0))
    .filter((price) => Number.isFinite(price) && price > 0)
    .sort((a, b) => a - b);

  let budgetFilters: string[] = [];
  if (allPrices.length > 0) {
    const index = (ratio: number) => Math.min(allPrices.length - 1, Math.floor((allPrices.length - 1) * ratio));
    const p25 = allPrices[index(0.25)];
    const p50 = allPrices[index(0.5)];
    const p75 = allPrices[index(0.75)];

    budgetFilters = [
      `Under ₹${formatInr(p25)}`,
      `₹${formatInr(p25 + 1)} - ₹${formatInr(p50)}`,
      `₹${formatInr(p50 + 1)} - ₹${formatInr(p75)}`,
      `Above ₹${formatInr(p75)}`,
    ];
  }

  const trustStats = [
    `${products.length}+ products available`,
    `${shopCategories.length}+ categories`,
    `${specialOccasions.length}+ special occasions`,
    `${subCategories.length}+ sub-categories`,
  ];

  const siteName = "3Dothub";
  const topBannerText =
    `${products.length}+ PRODUCTS • ${shopCategories.length}+ CATEGORIES • FAST DELIVERY • SECURE CHECKOUT`;
  const navLinks = [
    "Home",
    ...sections.map((item) => String(item.title ?? item.name ?? "").trim()).filter(Boolean),
  ];

  const sortedSubCategories = sortByOrder(subCategories);
  const sortedCategories = sortByOrder(shopCategories);

  const categoryByAnyId = new Map<string, Record<string, unknown>>();
  sortedCategories.forEach((category) => {
    const objectId = String(category._id ?? "").trim();
    const customId = String(category.id ?? "").trim();

    if (objectId) {
      categoryByAnyId.set(objectId, category);
    }

    if (customId) {
      categoryByAnyId.set(customId, category);
    }
  });

  const sectionContainsCategory = (
    sectionId: string,
    category: Record<string, unknown>
  ) => {
    if (Array.isArray(category.sectionIds)) {
      return category.sectionIds.includes(sectionId);
    }

    return String(category.sectionId ?? "").trim() === sectionId;
  };

  const recipientOccasionKeys = new Set([
    "for him",
    "him",
    "for her",
    "her",
    "couples",
    "couple",
    "for couples",
    "for kids",
    "kids",
    "for parents",
    "parents",
    "friends",
  ]);

  const shopByOccasionItems = Array.from(
    new Set(
      products.flatMap((item) => {
        if (!Array.isArray(item.occasions)) {
          return [];
        }

        return item.occasions
          .map((occasion) => String(occasion ?? "").trim())
          .filter(Boolean)
          .filter((occasion) => !recipientOccasionKeys.has(normalizeText(occasion)));
      })
    )
  );

  const specialOccasionItems = sortedOccasions
    .map((item) => String(item.name ?? "").trim())
    .filter(Boolean);

  const sectionHeaderGroups: HeaderSection[] = sections
    .map((section) => {
      const sectionId = String(section.id ?? section._id ?? "").trim();
      const title = String(section.title ?? section.name ?? "").trim();

      const subCategoryNames = sortedSubCategories
        .filter((subCategory) => {
          const categoryId = String(
            subCategory.categoryId ?? subCategory.shopCategoryId ?? ""
          ).trim();

          const parentCategory = categoryByAnyId.get(categoryId);
          if (!parentCategory) {
            return false;
          }

          return sectionContainsCategory(sectionId, parentCategory);
        })
        .map((subCategory) => String(subCategory.name ?? "").trim())
        .filter(Boolean);

      const fallbackCategoryNames = sortedCategories
        .filter((category) => sectionContainsCategory(sectionId, category))
        .map((category) => String(category.name ?? "").trim())
        .filter(Boolean);

      const subSections =
        subCategoryNames.length > 0 ? subCategoryNames : fallbackCategoryNames;

      return {
        id: sectionId,
        title,
        subSections: Array.from(new Set(subSections)),
      };
    })
    .filter((item) => item.id && item.title && item.subSections.length > 0);

  const headerSections: HeaderSection[] = [
    ...sectionHeaderGroups,
    {
      id: "shop_by_occasion",
      title: "Shop by Occasion",
      subSections: shopByOccasionItems,
    },
    {
      id: "special_occasions",
      title: "Special Occasions",
      subSections: specialOccasionItems,
    },
  ].filter((item) => item.subSections.length > 0);

  const footerInfo: FooterInfo = {
    brand: siteName,
    description: `${products.length}+ curated gifts across ${specialOccasions.length}+ occasions.`,
    phone: "",
    email: "",
    address: "",
    links: sections
      .map((item) => String(item.title ?? item.name ?? "").trim())
      .filter(Boolean)
      .slice(0, 4),
    copyright: `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`,
  };

  return {
    siteName,
    fallbackImage,
    topBannerText,
    navLinks,
    headerSections,
    footerInfo,
    heroSlides,
    quickCategories,
    occasionCards,
    occasionChips,
    recipientChips,
    recipientCards,
    trustStats,
    comboProducts,
    budgetFilters,
    personalizedCategories,
    corporateCategories,
    trendingProducts:
      trendingProducts.length > 0 ? trendingProducts : fallbackProducts,
    bestSellerProducts:
      bestSellerProducts.length > 0 ? bestSellerProducts : fallbackProducts,
  };
};
