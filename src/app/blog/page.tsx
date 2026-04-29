import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — DataOverMind",
  description:
    "Insights on AI engineering, machine learning trends, and technical deep-dives from the DataOverMind team.",
};

// Placeholder blog posts — will be replaced with Sanity data when connected
const posts = [
  {
    slug: "building-production-llm-pipelines",
    title: "Building Production-Grade LLM Pipelines",
    excerpt:
      "A comprehensive guide to designing, deploying, and monitoring large language model pipelines that scale reliably in production environments.",
    category: "Engineering",
    publishedAt: "2026-04-15",
    readTime: "8 min",
  },
  {
    slug: "ai-agents-enterprise-automation",
    title: "AI Agents: The Future of Enterprise Automation",
    excerpt:
      "How autonomous AI agents are revolutionizing business workflows, from customer support to supply chain management and beyond.",
    category: "AI Trends",
    publishedAt: "2026-04-08",
    readTime: "6 min",
  },
  {
    slug: "fine-tuning-vs-rag-when-to-use",
    title: "Fine-Tuning vs RAG: When to Use What",
    excerpt:
      "A practical comparison of fine-tuning and retrieval-augmented generation approaches, with decision frameworks for real-world applications.",
    category: "Technical",
    publishedAt: "2026-03-28",
    readTime: "10 min",
  },
  {
    slug: "computer-vision-manufacturing-2026",
    title: "Computer Vision in Manufacturing: 2026 Outlook",
    excerpt:
      "How edge AI and advanced CV models are transforming quality control, safety monitoring, and predictive maintenance in smart factories.",
    category: "Industry",
    publishedAt: "2026-03-15",
    readTime: "7 min",
  },
  {
    slug: "responsible-ai-framework",
    title: "Building a Responsible AI Framework",
    excerpt:
      "A practical guide to implementing ethical AI governance, bias detection, model auditing, and transparency in enterprise AI systems.",
    category: "AI Ethics",
    publishedAt: "2026-03-05",
    readTime: "9 min",
  },
  {
    slug: "vector-databases-comparison",
    title: "Vector Databases Compared: Pinecone vs Weaviate vs Qdrant",
    excerpt:
      "An in-depth technical comparison of leading vector databases for RAG applications, with benchmarks on latency, cost, and scalability.",
    category: "Technical",
    publishedAt: "2026-02-20",
    readTime: "12 min",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Blog
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Insights on AI engineering, industry trends, and technical
            deep-dives from our team.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass rounded-xl p-6 h-full group hover:bg-surface-hover hover:border-primary/20 hover:shadow-[0_0_20px_rgba(0,194,255,0.08)] transition-all duration-300">
                {/* Thumbnail placeholder */}
                <div className="w-full h-36 rounded-lg bg-gradient-to-br from-primary/10 to-purple/10 border border-border-base mb-5 flex items-center justify-center">
                  <span className="text-3xl opacity-30">📝</span>
                </div>

                <span className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full bg-accent/10 border border-accent/20 text-accent">
                  {post.category}
                </span>

                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  {post.title}
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                </h2>

                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
