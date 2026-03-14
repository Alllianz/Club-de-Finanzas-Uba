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

export type ArticleSection = "HOME" | "PORTFOLIO" | "RESEARCH";
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
