import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  /** Semantic element to render (e.g. "h1", "h2", "span"). */
  as?: ElementType;
  className?: string;
}

/**
 * Renders text with the signature cyan → purple gradient (spec: Module 1.3).
 */
export default function GradientText({
  children,
  as: Tag = "span",
  className,
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Tag>
  );
}
