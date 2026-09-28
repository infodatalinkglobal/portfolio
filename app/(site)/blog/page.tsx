import type { Metadata } from "next";
import GradientText from "@/components/ui/GradientText";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI agents, tutorials, and thoughts.",
};

/** Part 1 stub — the full listing ships in Module 2.4. */
export default function BlogPage() {
  return (
    <SectionWrapper className="min-h-[50dvh]">
      <p className="font-mono text-sm text-muted-light">
        {"// module 2.4 — ships in Part 2"}
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold sm:text-5xl">
        <GradientText>Blog</GradientText>
      </h1>
      <p className="mt-4 max-w-xl text-muted-light">
        AI agents, tutorials, and thoughts. The blog listing is being built —
        posts added in Sanity will appear here automatically.
      </p>
    </SectionWrapper>
  );
}
