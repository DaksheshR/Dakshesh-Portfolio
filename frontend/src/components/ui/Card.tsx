/**
 * Reusable Card component with glassmorphism and hover effects.
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
  default: "bg-[#111113] border border-[#27272a]",
  glass: "glass",
  bordered: "bg-[#111113] border border-primary-500/30",
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
        "rounded-xl",
        variantStyles[variant],
        paddingStyles[padding],
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
