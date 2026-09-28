"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { siteConfig } from "@/lib/site";

const ROLES = ["AI Engineer", "Agent Builder", "Freelance Dev"];

/**
 * Typewriter cycling through roles (2.1). Static under
 * prefers-reduced-motion.
 */
function useTypewriter(words: string[], reduced: boolean): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 350);
    } else {
      timeout = setTimeout(
        () => setLength((l) => l + (deleting ? -1 : 1)),
        deleting ? 40 : 85
      );
    }
    return () => clearTimeout(timeout);
  }, [length, deleting, wordIndex, words, reduced]);

  if (reduced) return words[0];
  return words[wordIndex % words.length].slice(0, length);
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const typed = useTypewriter(ROLES, Boolean(reduceMotion));

  const container: Variants = reduceMotion
    ? {}
    : { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const item: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      };

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden">
      {/* Dot-grid background + soft glows (2.1) */}
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid bg-[size:24px_24px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-radial-cyan" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-radial-purple" />

      {/* Lightweight floating dots (3.1) */}
      <div aria-hidden="true" className="absolute left-[12%] top-[24%] h-2 w-2 animate-float rounded-full bg-cyan/50" />
      <div aria-hidden="true" className="absolute right-[15%] top-[32%] h-1.5 w-1.5 animate-float rounded-full bg-purple/60 [animation-delay:1.2s]" />
      <div aria-hidden="true" className="absolute bottom-[26%] left-[24%] h-1.5 w-1.5 animate-float rounded-full bg-green/50 [animation-delay:2.4s]" />
      <div aria-hidden="true" className="absolute bottom-[20%] right-[26%] h-2 w-2 animate-float rounded-full bg-cyan/40 [animation-delay:0.6s]" />

      <motion.div
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6"
      >
        {/* Availability badge with pulsing dot */}
        <motion.div variants={item} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 py-1.5 font-mono text-xs text-green">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green" />
            {siteConfig.availability}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-mono text-5xl font-bold tracking-tight sm:text-7xl"
        >
          <GradientText>{siteConfig.name}</GradientText>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 font-mono text-xl text-foreground sm:text-2xl"
        >
          <span aria-hidden="true">{typed}</span>
          <span aria-hidden="true" className="ml-1 inline-block h-5 w-[3px] animate-pulse-dot rounded-sm bg-cyan align-[-2px] sm:h-6" />
          <span className="sr-only">{ROLES.join(", ")}</span>
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-light"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/projects" size="lg">
            View My Work
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Get In Touch
          </Button>
        </motion.div>

        <motion.a
          variants={item}
          href="#featured-work"
          aria-label="Scroll down to featured work"
          className="mt-16 inline-block font-mono text-xs text-muted-light transition-colors hover:text-cyan"
        >
          ↓ scroll
        </motion.a>
      </motion.div>
    </section>
  );
}
