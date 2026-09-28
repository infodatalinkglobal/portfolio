"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** When set, renders as a Next.js <Link>; otherwise a <button>. */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

const MotionLink = motion.create(Link);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan font-semibold text-background shadow-glow-cyan hover:shadow-glow-cyan-lg",
  secondary:
    "border border-line bg-surface/50 text-foreground hover:border-cyan/60 hover:shadow-glow-cyan",
  ghost: "text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Primary CTA button with a cyan hover glow (Framer Motion lift + shadow).
 * Spec: Module 1.3.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  className,
  type = "button",
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const classes = cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-md font-mono transition-all duration-300",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "pointer-events-none opacity-50",
    className
  );

  const motionProps = reduceMotion
    ? {}
    : { whileHover: { y: -2 }, whileTap: { y: 0, scale: 0.98 } };

  if (href && !disabled) {
    return (
      <MotionLink
        {...motionProps}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
