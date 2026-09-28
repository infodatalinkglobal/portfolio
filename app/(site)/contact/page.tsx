import type { Metadata } from "next";
import GradientText from "@/components/ui/GradientText";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's work together — open to full-time roles and freelance projects.",
};

/** Part 1 stub — the Formspree contact form ships in Module 2.7. */
export default function ContactPage() {
  return (
    <SectionWrapper className="min-h-[50dvh]">
      <p className="font-mono text-sm text-muted-light">
        {"// module 2.7 — ships in Part 2"}
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold sm:text-5xl">
        <GradientText>Let&apos;s Work Together</GradientText>
      </h1>
      <p className="mt-4 max-w-xl text-muted-light">
        The contact form (wired to Formspree) is being built. Open to
        full-time roles and freelance projects.
      </p>
    </SectionWrapper>
  );
}
