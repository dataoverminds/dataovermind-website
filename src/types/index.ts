/* ============================================
   DataOverMind — TypeScript Interfaces
   ============================================ */

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: {
    asset: { _ref: string; url?: string };
    alt?: string;
  };
  body?: unknown[];
  author?: Author;
  categories?: Category[];
  publishedAt: string;
  _createdAt: string;
}

export interface Author {
  _id: string;
  name: string;
  image?: {
    asset: { _ref: string; url?: string };
  };
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface UseCase {
  id: string;
  industry: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface TechItem {
  name: string;
  category: string;
  icon?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
