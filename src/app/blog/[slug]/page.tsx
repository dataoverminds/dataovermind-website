import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

// Placeholder blog content database
const postsDB: Record<
  string,
  {
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readTime: string;
    author: string;
    content: string[];
  }
> = {
  "building-production-llm-pipelines": {
    title: "Building Production-Grade LLM Pipelines",
    excerpt:
      "A comprehensive guide to designing, deploying, and monitoring large language model pipelines.",
    category: "Engineering",
    publishedAt: "2026-04-15",
    readTime: "8 min",
    author: "DataOverMind Team",
    content: [
      "Large Language Models have moved from research curiosity to production necessity in record time. But building reliable, scalable LLM pipelines requires careful engineering that goes far beyond prompt writing.",
      "In this guide, we cover the full lifecycle of production LLM systems: from model selection and fine-tuning strategies to deployment architectures that handle real-world traffic patterns.",
      "Key considerations include: latency optimization through batching and caching, cost management with model routing and fallback chains, quality assurance through automated evaluation pipelines, and observability with structured logging and trace analysis.",
      "We also explore the critical role of vector databases in RAG architectures, comparing in-memory solutions for low-latency applications against managed services like Pinecone for scalability.",
      "The most successful production LLM systems we've built share common patterns: they start simple, measure everything, and iterate rapidly based on real user feedback rather than synthetic benchmarks.",
    ],
  },
  "ai-agents-enterprise-automation": {
    title: "AI Agents: The Future of Enterprise Automation",
    excerpt:
      "How autonomous AI agents are revolutionizing business workflows.",
    category: "AI Trends",
    publishedAt: "2026-04-08",
    readTime: "6 min",
    author: "DataOverMind Team",
    content: [
      "The next wave of enterprise AI isn't about individual models — it's about autonomous agents that can plan, execute, and iterate on complex tasks with minimal human oversight.",
      "AI agents represent a paradigm shift from tool-based AI (where humans direct every action) to goal-based AI (where humans define objectives and agents determine the best path to achieve them).",
      "In enterprise settings, we're seeing agents deployed across customer support (handling multi-step resolution flows), data analysis (autonomously investigating anomalies), and operations (coordinating across systems to resolve incidents).",
      "The key technical challenges include reliable planning and reasoning, safe tool use with proper guardrails, memory management for long-running tasks, and graceful escalation when agents encounter situations beyond their capabilities.",
      "Organizations that start building agent infrastructure today will have a significant competitive advantage as the technology matures over the next 12-18 months.",
    ],
  },
  "fine-tuning-vs-rag-when-to-use": {
    title: "Fine-Tuning vs RAG: When to Use What",
    excerpt:
      "A practical comparison of fine-tuning and retrieval-augmented generation approaches.",
    category: "Technical",
    publishedAt: "2026-03-28",
    readTime: "10 min",
    author: "DataOverMind Team",
    content: [
      "One of the most common questions we hear from clients: should we fine-tune a model or use RAG? The answer, as with most engineering decisions, depends on your specific requirements.",
      "Fine-tuning excels when you need to: change the model's behavior or style, teach domain-specific patterns, reduce latency by eliminating retrieval steps, or work with structured output formats consistently.",
      "RAG is preferable when: your knowledge base changes frequently, you need transparent source attribution, you want to avoid the cost and complexity of training, or you need to combine information from multiple dynamic sources.",
      "In practice, the best production systems often combine both approaches: a fine-tuned base model for consistent behavior and domain adaptation, augmented with RAG for current, factual information retrieval.",
      "We recommend starting with RAG (lower barrier to entry) and selectively adding fine-tuning for specific capabilities where RAG falls short. This iterative approach minimizes upfront investment while building toward an optimal system.",
    ],
  },
};

// Fallback for unknown slugs
const fallbackPost = {
  title: "Blog Post",
  excerpt: "This post is coming soon.",
  category: "General",
  publishedAt: "2026-01-01",
  readTime: "5 min",
  author: "DataOverMind Team",
  content: [
    "This blog post content is currently being prepared. Check back soon for the full article.",
    "In the meantime, explore our other posts for insights on AI engineering, industry trends, and technical deep-dives.",
  ],
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postsDB[slug] || fallbackPost;
  return {
    title: `${post.title} — DataOverMind Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = postsDB[slug] || fallbackPost;

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-screen pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full bg-accent/10 border border-accent/20 text-accent">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime} read
            </span>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-base to-transparent mb-10" />

        {/* Body */}
        <div className="prose prose-invert max-w-none">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-text-secondary leading-relaxed mb-6 text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 glass-strong rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Need help implementing this?
          </h3>
          <p className="text-text-secondary text-sm mb-6">
            Our team can help you build production AI systems.
          </p>
          <Link
            href="/#cta"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-primary to-accent text-background rounded-lg hover:shadow-[0_0_25px_rgba(0,194,255,0.3)] transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </article>
    </main>
  );
}
