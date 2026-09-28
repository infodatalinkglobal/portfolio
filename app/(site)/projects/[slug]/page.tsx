import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Badge, { statusBadgeProps } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import GradientText from "@/components/ui/GradientText";
import PortableTextView from "@/components/ui/PortableText";
import Reveal from "@/components/ui/Reveal";
import { getProjectBySlug, getProjects, urlFor } from "@/lib/sanity";

/**
 * Rendered on demand so unknown slugs always return a real 404 status
 * (spec 2.3: "Return 404 if not found"). Known slugs come from
 * generateStaticParams below; when Sanity has no data yet, the route is
 * fully dynamic and 404s correctly.
 */
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

/**
 * Project case study (Module 2.3).
 * `longDescription` H2 headings ("The Problem", "Your Role", "Approach /
 * Process", "Results / Outcome") render as gradient section headings.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { variant, label } = statusBadgeProps(project.status);
  const thumb = project.thumbnail?.asset?._ref
    ? urlFor(project.thumbnail).url()
    : null;

  return (
    <article>
      {/* Hero banner: full-width thumbnail + title + one-liner overlay */}
      <div className="relative h-[45dvh] min-h-[320px] w-full overflow-hidden sm:h-[55dvh]">
        {thumb ? (
          <Image
            src={thumb}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-br from-surface via-background to-surface"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
            <Badge variant={variant} className="mb-4">
              {label}
            </Badge>
            <h1 className="font-mono text-4xl font-bold sm:text-5xl">
              <GradientText>{project.title}</GradientText>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-light">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Meta bar: role, tech pills, live + GitHub buttons */}
        <Reveal>
          <div className="mt-10 flex flex-col gap-5 border-y border-line py-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Role
              </p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {project.role}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(project.techStack ?? []).map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                >
                  Visit live site <ExternalLink size={14} aria-hidden="true" />
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                >
                  View code <GitHubIcon size={14} />
                </Button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Case study body (portable text + code blocks) */}
        <div className="mt-8">
          <PortableTextView value={project.longDescription} />
        </div>

        <div className="mb-4 mt-16 border-t border-line pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-cyan transition-colors hover:text-cyan/80"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Back to Projects
          </Link>
        </div>
      </div>
    </article>
  );
}
