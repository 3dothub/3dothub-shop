"use client";

import HeroSection from "@/lib/components/home/HeroSection";
import QuickCategoryGrid from "@/lib/components/home/QuickCategoryGrid";
import OccasionRecipientSection from "@/lib/components/home/OccasionRecipientSection";
import ProductShowcaseSection from "@/lib/components/home/ProductShowcaseSection";
import ComboBudgetCategorySection from "@/lib/components/home/ComboBudgetCategorySection";
import GiftFooter from "@/lib/components/home/GiftFooter";
import useScrollReveal from "@/lib/hooks/useScrollReveal";
import { useGetStorefrontQuery } from "@/lib/redux/endpoints/productsApi";

export default function Home() {
  useScrollReveal();
  const { data } = useGetStorefrontQuery();

  const dynamicOccasionCards = data?.occasionCards;
  const dynamicTopBannerText = data?.topBannerText;
  const dynamicFallbackImage = data?.fallbackImage;
  const dynamicFooterInfo = data?.footerInfo;
  const dynamicHeroSlides = data?.heroSlides;
  const dynamicQuickCategories = data?.quickCategories;
  const dynamicRecipientCards = data?.recipientCards;
  const dynamicTrustStats = data?.trustStats;
  const dynamicComboProducts = data?.comboProducts;
  const dynamicBudgetFilters = data?.budgetFilters;
  const dynamicTrending = data?.trendingProducts;
  const dynamicBestSellers = data?.bestSellerProducts;
  const dynamicPersonalized = data?.personalizedCategories;
  const dynamicCorporate = data?.corporateCategories;

  return (
    <div className="flex flex-col">
      <section
        className="reveal border-b border-(--border) bg-(--surface-strong) py-2"
        data-reveal
      >
        <p className="mx-auto w-full max-w-6xl px-4 text-center text-[11px] uppercase tracking-[0.22em] text-(--muted) md:px-6">
          {dynamicTopBannerText ?? ""}
        </p>
      </section>

      <HeroSection slides={dynamicHeroSlides} />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
        <QuickCategoryGrid items={dynamicQuickCategories} />
        <OccasionRecipientSection
          cards={dynamicOccasionCards}
          recipientCards={dynamicRecipientCards}
          trustStats={dynamicTrustStats}
        />
        <ProductShowcaseSection
          title="Trending Gifts"
          subtitle="Latest favorites everyone is talking about"
          action="View all"
          products={dynamicTrending ?? []}
          fallbackImage={dynamicFallbackImage}
        />
        <ProductShowcaseSection
          title="Best Sellers"
          subtitle="Our most popular products loved by everyone"
          action="View all"
          products={dynamicBestSellers ?? []}
          fallbackImage={dynamicFallbackImage}
        />
        <ComboBudgetCategorySection
          comboProducts={dynamicComboProducts}
          budgetFilters={dynamicBudgetFilters}
          personalized={dynamicPersonalized ?? []}
          corporate={dynamicCorporate ?? []}
        />
      </div>
      <GiftFooter info={dynamicFooterInfo} />
    </div>
  );
}
