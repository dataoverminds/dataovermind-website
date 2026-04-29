"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play, Shield, Zap, Bot } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { NetworkBackground } from "@/components/ui/NetworkBackground";
import { AIVisual } from "@/components/ui/AIVisual";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,transparent_0%,#05070A_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-40 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(5,7,10,0.8), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1]" style={{ background: 'linear-gradient(to top, #05070A, transparent)' }} />

      <GlowOrb color="blue" size="xl" className="top-[20%] left-[5%] opacity-20 z-[1]" />
      <GlowOrb color="purple" size="lg" className="bottom-[15%] right-[10%] opacity-15 z-[1]" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="max-w-xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,194,255,0.08)', border: '1px solid rgba(0,194,255,0.15)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#00FFE5' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#00FFE5' }} />
                </span>
                <span className="text-xs font-medium tracking-wide" style={{ color: '#00C2FF' }}>
                  AI Systems Online
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.8rem] font-bold tracking-tight leading-[1.2] mb-14"
            >
              AI Systems That
              <br />
              <span className="gradient-text">Replace Manual Work</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg leading-relaxed mb-16 max-w-lg"
              style={{ color: '#94A3B8' }}
            >
              We design and deploy intelligent AI agents that automate
              workflows, reduce costs, and scale your business operations.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16"
            >
              <Link href="/contact" className="btn-primary py-3.5 px-7">
                Book a Call
                <ArrowRight size={18} />
              </Link>
              <Link href="#demo" className="btn-secondary py-3.5 px-7">
                <Play size={16} style={{ color: '#00C2FF' }} />
                View Demo
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-2 text-xs"
              style={{ color: '#64748B' }}
            >
              <Shield size={13} />
              <span>Built for startups, SaaS teams, and growing businesses</span>
            </motion.div>
          </div>

          {/* Right */}
          <div className="hidden lg:flex relative items-center justify-end">
            <AIVisual />
          </div>
        </div>

        {/* Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-24 lg:mt-32"
        >
          <div className="glass-strong px-6 py-5 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Zap, value: "10x", label: "Faster Processing", color: "#00C2FF" },
                { icon: Bot, value: "50+", label: "AI Agents Deployed", color: "#00FFE5" },
                { icon: Shield, value: "99.9%", label: "System Uptime", color: "#8B5CF6" },
                { icon: ArrowRight, value: "40%", label: "Cost Reduction Avg.", color: "#00C2FF" },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center gap-3">
                  <div className="icon-box icon-box-subtle">
                    <metric.icon size={16} style={{ color: metric.color }} />
                  </div>
                  <div>
                    <div className="text-lg font-bold" style={{ color: metric.color }}>{metric.value}</div>
                    <div className="text-[11px] leading-tight" style={{ color: '#64748B' }}>{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
