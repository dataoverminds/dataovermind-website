"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const caseStudies = [
  {
    title: "AI Support Agent",
    metric: "70%",
    metricLabel: "Response Time Reduction",
    description: "Reduced customer response time by 70%.",
  },
  {
    title: "Internal AI Assistant",
    metric: "Instant",
    metricLabel: "Knowledge Retrieval",
    description: "Enabled instant access to company knowledge.",
  },
  {
    title: "Workflow Automation",
    metric: "60%",
    metricLabel: "Process Automation",
    description: "Automated 60% of manual processes.",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <SectionHeading badge="Proven Impact" title="Case Studies" subtitle="" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 w-full">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <GlassCard className="h-full flex flex-col group cursor-pointer hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,194,255,0.08)] transition-all duration-300 relative overflow-hidden">
                {/* Subtle gradient glow in the top right corner of the card */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00C2FF] rounded-full blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                <div className="flex justify-end mb-8">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 group-hover:bg-[#00C2FF]/10 transition-all duration-300">
                     <ArrowUpRight size={16} className="text-white group-hover:text-[#00C2FF] transition-colors" />
                  </div>
                </div>

                <div className="mb-14 flex-1">
                  <div className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 group-hover:scale-105 transform origin-left transition-transform duration-300" style={{ 
                    background: 'linear-gradient(135deg, #FFF 0%, #94A3B8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {cs.metric}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: '#00C2FF' }}>
                    {cs.metricLabel}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-6 group-hover:text-white transition-colors duration-300" style={{ color: '#F8FAFC' }}>
                    {cs.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                    {cs.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
