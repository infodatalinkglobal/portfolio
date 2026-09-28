"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Tracks the pathname the menu was opened on. Navigating (including
 * back/forward) naturally closes it — no effect-driven setState needed.
 */
type MenuState = string | null;

/**
 * Sticky navbar: transparent at top → dark + backdrop blur on scroll,
 * cyan active-link underline, animated mobile hamburger (spec: Module 1.3).
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpenFor, setMenuOpenFor] = useState<MenuState>(null);
  const open = menuOpenFor !== null;
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpenFor(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="font-mono text-base text-foreground transition-colors hover:text-cyan"
        >
          <span className="text-cyan">~/</span>
          {siteConfig.name.toLowerCase().replace(/\s+/g, "-")}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 font-mono text-sm transition-colors",
                  isActive(link.href)
                    ? "text-cyan"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-cyan shadow-glow-cyan"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpenFor(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:bg-foreground/5 hover:text-foreground md:hidden"
        >
          {open ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpenFor(null)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2.5 font-mono text-sm",
                      isActive(link.href)
                        ? "bg-cyan/10 text-cyan"
                        : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
