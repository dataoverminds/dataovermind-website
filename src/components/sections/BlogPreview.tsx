"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BlogPreview({ posts = [] }: { posts?: any[] }) {
  // Use fallback hardcoded posts if no dynamic posts are provided
  const displayPosts = posts.length > 0 ? posts : [
    { slug: { current: "rag-vs-fine-tuning" }, title: "RAG vs Fine-Tuning: What Businesses Should Choose", excerpt: "A practical comparison of fine-tuning and retrieval-augmented generation approaches, with decision frameworks for enterprise use cases...", categories: [{title: "Technical"}], publishedAt: "2026-04-15", readTime: "8 min" },
    { slug: { current: "ai-agents-replacing-manual-work" }, title: "How AI Agents Are Replacing Manual Work", excerpt: "How autonomous AI agents are revolutionizing business workflows, from customer support to supply chain and data entry...", categories: [{title: "AI Trends"}], publishedAt: "2026-04-08", readTime: "6 min" },
    { slug: { current: "building-ai-chatbots-that-work" }, title: "Building AI Chatbots That Actually Work", excerpt: "A comprehensive guide to designing, deploying, and monitoring large language model pipelines that scale reliably and deliver real value...", categories: [{title: "Engineering"}], publishedAt: "2026-03-28", readTime: "10 min" },
  ];

  return (
    <section id="blog" className="relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <SectionHeading badge="Insights" title="Insights on AI & Automation" subtitle="Stay ahead with our latest insights on AI engineering, industry trends, and technical deep-dives." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
          {displayPosts.map((post, i) => {
            const slug = post.slug?.current || post.slug;
            const category = post.categories?.[0]?.title || post.category || "Insight";
            // Format date string to "YYYY-MM-DD" if it exists
            const dateStr = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "";
            
            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${slug}`} className="block h-full">
                  <div className="glass-card h-full group flex flex-col">
                    {/* Thumbnail */}
                    {post.mainImage?.asset?.url ? (
                      <div className="w-full h-40 rounded-lg mb-6 overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={post.mainImage.asset.url} 
                          alt={post.mainImage.alt || post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-40 rounded-lg mb-6 flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, rgba(0,194,255,0.06), rgba(139,92,246,0.06))', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span className="text-3xl opacity-20">📝</span>
                      </div>
                    )}

                    <span className="badge badge-accent mb-6 inline-flex self-start">{category}</span>
                    <h3 className="text-base font-semibold mb-5 group-hover:text-[#00C2FF] transition-colors flex items-start gap-2">
                      <span className="flex-1">{post.title}</span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                    </h3>
                    <p className="text-sm leading-relaxed mb-8 line-clamp-2 flex-1" style={{ color: '#94A3B8' }}>{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs mt-auto pt-4 border-t border-white/5" style={{ color: '#64748B' }}>
                      {dateStr && <span className="flex items-center gap-1"><Calendar size={11} />{dateStr}</span>}
                      {dateStr && post.readTime && <span>·</span>}
                      {post.readTime && <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center">
          <Link href="/blog" className="btn-secondary inline-flex">
            View All Posts
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
