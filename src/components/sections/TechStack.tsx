"use client";

import React from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrainCircuit, Bot, Link, Zap, Triangle, Database, Server } from "lucide-react";

const technologies = [
  { name: "OpenAI", icon: BrainCircuit, color: "#10B981" },
  { name: "Llama", icon: Bot, color: "#60A5FA" },
  { name: "LangChain", icon: Link, color: "#00C2FF" },
  { name: "FastAPI", icon: Zap, color: "#14B8A6" },
  { name: "Pinecone / Weaviate", icon: Database, color: "#A855F7" },
  { name: "PostgreSQL", icon: Server, color: "#3B82F6" },
  { name: "Vercel", icon: Triangle, color: "#F8FAFC" },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="relative section-padding overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00C2FF]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <SectionHeading badge="Infrastructure" title="Powered by Modern AI Infrastructure" subtitle="" />
        
        <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-4xl mx-auto w-full">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div 
                className="glass-card px-8 py-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden cursor-default"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                {/* Dynamic Neon Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                  style={{ background: `radial-gradient(120px circle at center, ${tech.color}, transparent)` }}
                />
                
                {/* Icon glowing shadow on hover */}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <div 
                    className="absolute inset-0 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ backgroundColor: tech.color }}
                  />
                  <tech.icon size={20} style={{ color: tech.color }} className="relative" />
                </div>

                <span className="font-semibold text-[15px] relative z-10 text-[#F8FAFC] tracking-wide group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
