"use client";

import React from "react";
import { motion } from "motion/react";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { icon: Search, title: "Understand Your Business", description: "We analyze your workflows and identify automation opportunities." },
  { icon: PenTool, title: "Design AI Solution", description: "We architect the right AI system tailored to your needs." },
  { icon: Rocket, title: "Build & Deploy", description: "Fast development and seamless integration into your systems." },
  { icon: TrendingUp, title: "Optimize & Scale", description: "Continuous improvement for performance and impact." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <SectionHeading badge="Process" title="From Idea to AI System" subtitle="" />

        <div className="relative max-w-2xl mx-auto mt-12 w-full">
          {/* Static Track Line */}
          <div className="absolute left-[1.625rem] top-[3rem] bottom-0 w-px bg-white/5" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-[1.625rem] top-[3rem] bottom-0 w-[2px] origin-top rounded-full"
            style={{ background: 'linear-gradient(to bottom, #00C2FF, #8B5CF6, transparent)' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex gap-8 items-start group relative"
              >
                {/* Step circle */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,194,255,0.2)]"
                    style={{ background: '#05070A', border: '1px solid rgba(0,194,255,0.2)' }}
                  >
                    <step.icon size={22} style={{ color: '#00C2FF' }} className="group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: '#00C2FF', color: '#05070A' }}>
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-2 pb-16">
                  <h3 className="text-xl font-bold mb-6 tracking-tight group-hover:text-white transition-colors duration-300" style={{ color: '#F8FAFC' }}>
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed max-w-md" style={{ color: '#94A3B8' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
