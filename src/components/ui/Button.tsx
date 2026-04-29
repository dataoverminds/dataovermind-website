"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "!py-2 !px-4 !text-xs",
    md: "",
    lg: "!py-3.5 !px-8 !text-[0.9375rem]",
  };

  const variantClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  };

  return (
    <button
      className={cn(variantClass[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
