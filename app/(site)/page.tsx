import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  description: siteConfig.description,
};

/**
 * Part 1 placeholder home — replaced by the full hero + sections in
 * Module 2.1. Kept intentionally small: it exists to prove the design
 * system, fonts and navigation work end to end.
 */
export default function HomePage() {
  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden">
      {/* Dot-grid hero background + soft glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-grid bg-[size:24px_24px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-radial-cyan"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-radial-purple"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="mb-6 font-mono text-sm text-muted-light">
          <span className="text-green">●</span> scaffold online —{" "}
          {siteConfig.availability.toLowerCase()}
        </p>
        <h1 className="font-mono text-5xl font-bold tracking-tight sm:text-7xl">
          <GradientText>{siteConfig.name}</GradientText>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-light">
          {siteConfig.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/projects" size="lg">
            View My Work
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Get In Touch
          </Button>
        </div>
        <p className="mt-12 font-mono text-xs text-muted">
          {'// full home page ships in Part 2 (module 2.1)'}
        </p>
      </div>
    </div>
  );
}
