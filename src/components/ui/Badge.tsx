import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "emerald" | "amber" | "outline";
}

export function Badge({ className, variant = "primary", children, ...props }: BadgeProps) {
  const variantStyles = {
    primary: "bg-blue-50 text-blue-700 border-blue-200 font-medium",
    accent: "bg-purple-50 text-purple-700 border-purple-200 font-medium",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium",
    amber: "bg-amber-50 text-amber-800 border-amber-200 font-medium",
    outline: "bg-slate-100 text-slate-700 border-slate-200 font-medium",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
