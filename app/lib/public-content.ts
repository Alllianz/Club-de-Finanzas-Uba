import type { FeedEntry } from "../site-data";
import { homeFeed, homeFeatured, newsFeed, newsIntro, portfolioFeed, researchFeed } from "../site-data";
import { publicArticlesService } from "../services/public-articles-service";
import type { Article } from "./types";

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

async function getSectionContent(params: {
  section: "HOME" | "PORTFOLIO" | "RESEARCH" | "NEWS";
  fallbackFeatured: FeedEntry;
  fallbackFeed: FeedEntry[];
  limit?: number;
}) {
  const { section, fallbackFeatured, fallbackFeed, limit = 24 } = params;

  try {
    const [featuredResponse, feedResponse] = await Promise.all([
      publicArticlesService.list({ section, featured: true, limit: 1 }),
      publicArticlesService.list({ section, limit }),
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

export async function getNewsContent() {
  return getSectionContent({
    section: "NEWS",
    fallbackFeatured: newsFeed[0] ?? homeFeatured,
    fallbackFeed: newsFeed,
  });
}

export { newsIntro };
