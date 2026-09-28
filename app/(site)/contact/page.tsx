import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import CopyEmail from "@/components/ui/CopyEmail";
import GradientText from "@/components/ui/GradientText";
import Reveal from "@/components/ui/Reveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ContactForm from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's work together — open to full-time roles and freelance AI agent projects.",
  openGraph: {
    title: "Contact",
    description: "Open to full-time roles and freelance AI agent projects.",
    type: "website",
    url: `${siteConfig.url}/contact`,
  },
};

/** Contact (Module 2.7). */
export default function ContactPage() {
  return (
    <SectionWrapper className="min-h-[60dvh]">
      <Reveal>
        <p className="font-mono text-sm text-muted-light">{"// 02 — say hi"}</p>
        <h1 className="mt-2 font-mono text-4xl font-bold sm:text-5xl">
          <GradientText>Let&apos;s Work Together</GradientText>
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <p className="text-lg text-muted-light">
            Open to full-time roles and freelance projects
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-3 py-1 font-mono text-xs text-green">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green" />
            Available for work
          </span>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Form */}
        <Reveal className="lg:col-span-3">
          <ContactForm />
        </Reveal>

        {/* Direct links */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <h2 className="font-mono text-lg font-semibold text-foreground">
            Direct channels
          </h2>
          <ul className="mt-6 space-y-4">
            <li className="rounded-xl border border-line bg-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex min-w-0 items-center gap-3 text-sm text-foreground transition-colors hover:text-cyan"
                >
                  <Mail size={18} className="shrink-0 text-cyan" aria-hidden="true" />
                  <span className="truncate">{siteConfig.email}</span>
                </a>
                <CopyEmail />
              </div>
              <p className="mt-2 text-xs text-muted-light">
                Best for opportunities — I reply within 48 hours.
              </p>
            </li>
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-5 text-sm text-foreground transition-all duration-300 hover:border-cyan/40 hover:text-cyan hover:shadow-glow-cyan"
              >
                <GitHubIcon size={18} aria-hidden="true" />
                <span className="font-mono">GitHub — {new URL(siteConfig.github).hostname}</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-5 text-sm text-foreground transition-all duration-300 hover:border-cyan/40 hover:text-cyan hover:shadow-glow-cyan"
              >
                <LinkedInIcon size={18} aria-hidden="true" />
                <span className="font-mono">LinkedIn — {siteConfig.name}</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
