export type ListResponse<T> = {
  items: T[];
  total: number;
};

export type ShopCardProduct = {
  id?: string;
  title: string;
  category: string;
  price: number;
  strike?: number;
  discount?: string;
  image: string;
};

export type OccasionCard = {
  id?: string;
  title: string;
  caption: string;
  cta: string;
  image: string;
};

export type HeroSlide = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export type QuickCategory = {
  title: string;
  subtitle: string;
  image: string;
};

export type ComboProduct = {
  id?: string;
  title: string;
  price: number;
  image: string;
};

export type RecipientCard = {
  label: string;
  image: string;
};

export type FooterInfo = {
  brand: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  links: string[];
  copyright: string;
};

export type HeaderSection = {
  id: string;
  title: string;
  subSections: string[];
};

export type StorefrontResponse = {
  siteName: string;
  fallbackImage: string;
  topBannerText: string;
  navLinks: string[];
  headerSections: HeaderSection[];
  footerInfo: FooterInfo;
  heroSlides: HeroSlide[];
  quickCategories: QuickCategory[];
  occasionCards: OccasionCard[];
  occasionChips: string[];
  recipientChips: string[];
  recipientCards: RecipientCard[];
  trustStats: string[];
  comboProducts: ComboProduct[];
  budgetFilters: string[];
  personalizedCategories: string[];
  corporateCategories: string[];
  trendingProducts: ShopCardProduct[];
  bestSellerProducts: ShopCardProduct[];
};
