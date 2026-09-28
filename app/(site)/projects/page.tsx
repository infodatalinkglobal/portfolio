import type { Metadata } from "next";
import GradientText from "@/components/ui/GradientText";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI agents, tools, and experiments.",
};

/** Part 1 stub — the full grid ships in Module 2.2. */
export default function ProjectsPage() {
  return (
    <SectionWrapper className="min-h-[50dvh]">
      <p className="font-mono text-sm text-muted-light">
        {"// module 2.2 — ships in Part 2"}
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold sm:text-5xl">
        <GradientText>Projects</GradientText>
      </h1>
      <p className="mt-4 max-w-xl text-muted-light">
        AI agents, tools, and experiments. The projects grid is being built —
        once your Sanity project is connected (see{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 font-code text-sm text-cyan">
          docs/SETUP-CHECKLIST.md
        </code>
        ), content appears here automatically.
      </p>
    </SectionWrapper>
  );
}
