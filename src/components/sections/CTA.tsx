"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Zap, PhoneCall } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";

export function CTA() {
  return (
    <section id="cta" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,194,255,0.04), transparent)' }} />
      
      {/* Strong Centered Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0">
        <GlowOrb color="blue" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[100px]" />
        <GlowOrb color="purple" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[140px] scale-150" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-12 sm:p-16 lg:p-20 relative overflow-hidden"
        >
          {/* Internal subtle glow for the card itself */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 drop-shadow-lg">
              Let <span className="gradient-text">AI Do the Work</span>
            </h2>

            <p className="text-xl sm:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium" style={{ color: '#E2E8F0' }}>
              Start automating your business with intelligent AI systems.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="btn-primary py-4 px-10 text-base shadow-[0_0_30px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] transition-shadow duration-300">
                Book a Call
                <PhoneCall size={18} />
              </Link>
              <Link href="/contact" className="btn-secondary py-4 px-10 text-base border-white/10 hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5">
                <Zap size={16} style={{ color: '#00C2FF' }} />
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
