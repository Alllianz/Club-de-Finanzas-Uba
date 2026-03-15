import { API_BASE_URL } from "./config";
import type { FeedEntry } from "../site-data";
import {
  homeFeed,
  homeFeatured,
  portfolioFeed,
  researchFeed,
} from "../site-data";
import type { Article, ArticleSection } from "./types";

type PublicArticlesResponse = {
  items: Article[];
};

const formatDate = (value: string | null): string => {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const toFeedEntry = (item: Article): FeedEntry => ({
  category: item.category,
  date: formatDate(item.publishedAt),
  title: item.title,
  excerpt: item.excerpt,
  href: item.ctaUrl,
  cta: item.ctaLabel,
});

const query = (params: Record<string, string | number | boolean | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    search.set(key, String(value));
  });
  return search.toString();
};

async function fetchPublicArticles(params: Record<string, string | number | boolean | undefined>) {
  const url = `${API_BASE_URL}/public/articles?${query(params)}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Public API error: ${response.status}`);
  }
  return (await response.json()) as PublicArticlesResponse;
}

async function getSectionContent(params: {
  section: ArticleSection;
  fallbackFeatured: FeedEntry;
  fallbackFeed: FeedEntry[];
  limit?: number;
}) {
  const { section, fallbackFeatured, fallbackFeed, limit = 24 } = params;

  try {
    const [featuredResponse, feedResponse] = await Promise.all([
      fetchPublicArticles({ section, featured: true, limit: 1 }),
      fetchPublicArticles({ section, limit }),
    ]);

    const featured = featuredResponse.items[0]
      ? toFeedEntry(featuredResponse.items[0])
      : fallbackFeatured;

    const feedItems = feedResponse.items
      .filter((item) => !item.isFeatured)
      .map(toFeedEntry);

    return {
      featured,
      feed: feedItems.length > 0 ? feedItems : fallbackFeed,
    };
  } catch {
    return {
      featured: fallbackFeatured,
      feed: fallbackFeed,
    };
  }
}

export async function getHomeContent() {
  return getSectionContent({
    section: "HOME",
    fallbackFeatured: homeFeatured,
    fallbackFeed: homeFeed,
    limit: 12,
  });
}

export async function getPortfolioContent() {
  return getSectionContent({
    section: "PORTFOLIO",
    fallbackFeatured: portfolioFeed[0] ?? homeFeatured,
    fallbackFeed: portfolioFeed,
  });
}

export async function getResearchContent() {
  return getSectionContent({
    section: "RESEARCH",
    fallbackFeatured: researchFeed[0] ?? homeFeatured,
    fallbackFeed: researchFeed,
  });
}

