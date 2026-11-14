/**
 * Reusable Card component — Navy translucent cards with glowing borders.
 * Matches the Education section's premium dark design system.
 */

import { cn } from "@/utils/helpers";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "glass" | "bordered";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  default: "bg-[#0c0f24]/90 border border-[#1b2144]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.35)]",
  glass: "glass",
  bordered: "bg-[#0c0f24]/90 border border-primary-500/25 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.35)]",
};

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  variant = "default",
  hover = false,
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variantStyles[variant],
        paddingStyles[padding],
        hover && "card-hover hover:border-primary-500/40 hover:shadow-[0_4px_30px_rgba(0,0,0,0.35),0_0_15px_rgba(99,102,241,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
