"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-glow",
  secondary:
    "bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary/10",
  ghost:
    "bg-transparent text-brand-primary hover:bg-brand-primary/10 border border-transparent",
  subtle:
    "bg-surface-muted text-text hover:bg-brand-secondary/10 border border-transparent",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:opacity-50",
          variants[variant],
          className,
        )}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
