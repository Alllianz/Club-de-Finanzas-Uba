export type Role = "ADMIN" | "EDITOR";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  isActive: boolean;
};

export type AuthResponse = {
  user: AuthUser;
};

export type ArticleSection = "HOME" | "PORTFOLIO" | "RESEARCH" | "NEWS";
export type ArticleStatus = "DRAFT" | "PUBLISHED";

export type Article = {
  id: string;
  section: ArticleSection;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  ctaLabel: string;
  ctaUrl: string;
  status: ArticleStatus;
  publishedAt: string | null;
  isFeatured: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};
export type ArticleAuthor = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
};

export type AdminArticle = Article & {
  author?: ArticleAuthor;
};

export type MarketDirection = "up" | "down" | "flat";
export type MarketStatus = "positive" | "negative" | "neutral";

export type GlobalMarketItem = {
  symbol: string;
  label: string;
  value: number | null;
  changePercent: number | null;
  direction: MarketDirection;
  status: MarketStatus;
  updatedAt: string | null;
  source: "Alpha Vantage";
};

export type GlobalMarketSection = {
  key: "indices" | "rates" | "energy";
  title: string;
  items: GlobalMarketItem[];
};

export type GlobalMarketResponse = {
  updatedAt: string;
  sections: GlobalMarketSection[];
  stale?: boolean;
};
