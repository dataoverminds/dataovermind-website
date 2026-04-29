"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  hover = true,
  glow = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        hover ? "glass-card" : "glass-strong p-6",
        glow && "glow-border",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
