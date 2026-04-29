import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent" | "purple";
  className?: string;
}

const variantClass = {
  default: "badge-default",
  primary: "badge-primary",
  accent: "badge-accent",
  purple: "badge-purple",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn("badge", variantClass[variant], className)}>
      {children}
    </span>
  );
}
