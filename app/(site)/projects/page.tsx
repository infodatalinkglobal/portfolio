import type { Metadata } from "next";
import EmptyState from "@/components/ui/EmptyState";
import GradientText from "@/components/ui/GradientText";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getProjects } from "@/lib/sanity";

/** ISR: revalidate every 60 s (spec 3.4). */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "AI agents, tools, and experiments — built by an AI engineer.",
  openGraph: {
    title: "Projects",
    description: "AI agents, tools, and experiments — built by an AI engineer.",
    type: "website",
  },
};

/** Projects grid (Module 2.2). */
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <SectionWrapper wide className="min-h-[60dvh]">
      <Reveal>
        <p className="font-mono text-sm text-muted-light">
          {"// what i've built"}
        </p>
        <h1 className="mt-2 font-mono text-4xl font-bold sm:text-5xl">
          <GradientText>Projects</GradientText>
        </h1>
        <p className="mt-3 text-lg text-muted-light">
          AI agents, tools, and experiments
        </p>
      </Reveal>

      {projects.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} priority={i === 0} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-12"
          title="// no projects yet"
          hint="Connect your Sanity project (docs/SETUP-CHECKLIST.md) or run `node scripts/seed.mjs` — projects appear here automatically."
        />
      )}
    </SectionWrapper>
  );
}
