import type { Metadata } from "next";
import GradientText from "@/components/ui/GradientText";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "About",
  description: "About Alex Carter — AI engineer and agent builder.",
};

/** Part 1 stub — the full bio/skills/education page ships in Module 2.6. */
export default function AboutPage() {
  return (
    <SectionWrapper className="min-h-[50dvh]">
      <p className="font-mono text-sm text-muted-light">
        {"// module 2.6 — ships in Part 2"}
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold sm:text-5xl">
        <GradientText>About</GradientText>
      </h1>
      <p className="mt-4 max-w-xl text-muted-light">
        Bio, skills grid, education, and resume download are being built.
      </p>
    </SectionWrapper>
  );
}
