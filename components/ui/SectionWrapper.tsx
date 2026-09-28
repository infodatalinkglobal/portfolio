import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  /** Anchor id for in-page linking. */
  id?: string;
  className?: string;
  /** Break out to a wider container when needed. */
  wide?: boolean;
}

/**
 * Consistent section padding, max-width and centering (spec: Module 1.3).
 */
export default function SectionWrapper({
  children,
  id,
  className,
  wide = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full px-4 py-16 sm:px-6 md:py-24 lg:px-8",
        wide ? "max-w-7xl" : "max-w-6xl",
        className
      )}
    >
      {children}
    </section>
  );
}
