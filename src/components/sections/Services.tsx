"use client";

import React from "react";
import { motion } from "motion/react";
import { Bot, Sparkles, Cpu, Layers } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowOrb } from "@/components/ui/GlowOrb";

const services = [
  { icon: Bot, title: "AI Automation Systems", description: "Automate repetitive workflows using intelligent AI agents across operations, support, and internal processes." },
  { icon: Sparkles, title: "Generative AI Solutions", description: "Custom chatbots, RAG systems, and AI assistants trained on your business data." },
  { icon: Cpu, title: "AI Engineering", description: "Advanced LLM pipelines, fine-tuning, and multi-agent systems tailored to your needs." },
  { icon: Layers, title: "AI Product Development", description: "From MVP to scalable AI-powered platforms and SaaS products." },
];

export function Services() {
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <GlowOrb color="blue" size="lg" className="top-[10%] left-[-5%] opacity-15" />
      <GlowOrb color="cyan" size="md" className="bottom-[10%] right-[-5%] opacity-10" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <SectionHeading badge="What We Build" title="AI Systems Built for Real Business Impact" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,194,255,0.08)] transition-all duration-300">
                <div
                  className="icon-box icon-box-gradient mb-10 group-hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] transition-shadow duration-300"
                  style={{ width: '3.5rem', height: '3.5rem' }}
                >
                  <service.icon size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-6">{service.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: '#94A3B8' }}>{service.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
