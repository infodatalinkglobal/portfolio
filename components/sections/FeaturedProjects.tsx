import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import GradientText from "@/components/ui/GradientText";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getFeaturedProjects } from "@/lib/sanity";

/**
 * Home section: up to 3 featured projects from Sanity (2.1).
 */
export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);

  return (
    <SectionWrapper id="featured-work" wide>
      <Reveal>
        <p className="font-mono text-sm text-muted-light">
          {"// 01 — selected work"}
        </p>
        <h2 className="mt-2 font-mono text-3xl font-bold sm:text-4xl">
          <GradientText>Featured Work</GradientText>
        </h2>
      </Reveal>

      {projects.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} priority={i === 0} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-10"
          title="// no featured projects yet"
          hint="Create projects in Sanity (docs/SETUP-CHECKLIST.md) and toggle 'Featured on home page' — they appear here automatically."
        />
      )}

      {projects.length > 0 && (
        <Reveal className="mt-10 text-center">
          <Link
            href="/projects"
            className="font-mono text-sm text-cyan underline underline-offset-4 transition-colors hover:text-cyan/80"
          >
            View All Projects →
          </Link>
        </Reveal>
      )}
    </SectionWrapper>
  );
}
