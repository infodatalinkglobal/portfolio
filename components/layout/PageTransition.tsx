"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Framer Motion page-transition wrapper (spec: Modules 1.3 + 3.1).
 * Renders the <main> landmark so the skip-to-content link has a target.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main-content"
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
