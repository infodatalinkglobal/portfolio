"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";
import Badge, { statusBadgeProps } from "./Badge";
import { urlFor, type Project } from "@/lib/sanity";

interface ProjectCardProps {
  project: Project;
  /** Stagger index for entry animation. */
  index?: number;
  /** Priority-load the first card (LCP). */
  priority?: boolean;
}

/**
 * Project card used on the home page (2.1) and /projects grid (2.2).
 * Thumbnail, title, description, tech badges, status badge, view link.
 * Hover: cyan glow + lift (2.1).
 */
export default function ProjectCard({
  project,
  index = 0,
  priority = false,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const { variant, label } = statusBadgeProps(project.status);
  const thumb = project.thumbnail?.asset?._ref
    ? urlFor(project.thumbnail).url()
    : null;
  const tech = project.techStack ?? [];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug.current}`}
        aria-label={`View project: ${project.title}`}
        className="group block h-full"
      >
        <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan/40 group-hover:shadow-glow-cyan">
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-background">
            {thumb ? (
              <Image
                src={thumb}
                alt={project.thumbnail?.alt || `Screenshot of ${project.title}`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface via-background to-surface">
                <Box size={40} className="text-cyan/40" aria-hidden="true" />
              </div>
            )}
            <div className="absolute right-2 top-2">
              <Badge variant={variant}>{label}</Badge>
            </div>
          </div>

          <h3 className="font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-cyan">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-light">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {tech.slice(0, 3).map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
            {tech.length > 3 && <Badge variant="muted">+{tech.length - 3}</Badge>}
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-cyan">
            View Project
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
