import React from "react";
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  color?: "blue" | "cyan" | "purple";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const colorStyle = {
  blue: "rgba(0, 194, 255, 0.15)",
  cyan: "rgba(0, 255, 229, 0.12)",
  purple: "rgba(139, 92, 246, 0.15)",
};

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[500px] h-[500px]",
};

export function GlowOrb({
  color = "blue",
  size = "md",
  className,
  animate = true,
}: GlowOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none select-none",
        sizeMap[size],
        animate && "animate-glow-pulse",
        className
      )}
      style={{
        background: colorStyle[color],
        filter: "blur(100px)",
      }}
      aria-hidden="true"
    />
  );
}
