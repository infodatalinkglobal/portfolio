"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Cyan glow + subtle lift on hover (default on). */
  hover?: boolean;
}

/**
 * Dark card with border, cyan hover glow and smooth lift (spec: Module 1.3).
 */
export default function Card({ children, className, hover = true }: CardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group rounded-xl border border-line bg-surface p-5 transition-shadow duration-300",
        hover && "hover:border-cyan/40 hover:shadow-glow-cyan",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
