"use client";

import React from "react";
import { motion } from "motion/react";
import { MessageCircle, BookOpen, Target, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const useCases = [
  { icon: MessageCircle, title: "Customer Support Automation", description: "Reduce support load with AI handling queries instantly." },
  { icon: BookOpen, title: "Internal Knowledge Assistant", description: "Let your team access company knowledge in seconds." },
  { icon: Target, title: "Sales & Lead Qualification", description: "AI agents that qualify leads and respond automatically." },
  { icon: Zap, title: "Workflow Automation", description: "Replace manual processes with intelligent automation." },
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative section-padding overflow-hidden">
      {/* Subtle background line for connecting the cards visually */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent opacity-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <SectionHeading badge="Impact" title="Where AI Creates Real Impact" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mt-12 w-full">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col group hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,194,255,0.08)] transition-all duration-300">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-10 transition-colors duration-300 group-hover:bg-[#00C2FF]/10"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <uc.icon size={22} style={{ color: '#00C2FF' }} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-[17px] font-semibold mb-5 tracking-tight">{uc.title}</h3>
                <p className="text-[14px] leading-relaxed mb-10" style={{ color: '#94A3B8' }}>{uc.description}</p>
                
                <div className="mt-auto pt-4 border-t border-white/5 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-2" style={{ color: '#00C2FF' }}>
                    Explore Use Case &rarr;
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
