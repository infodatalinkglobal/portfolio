"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Badge from "./Badge";
import { urlFor, type BlogPost } from "@/lib/sanity";
import { readingTimeLabel } from "@/lib/richText";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  priority?: boolean;
}

/**
 * Blog card used on the home page (2.1) and /blog grid (2.4).
 * Cover (or placeholder), date, reading time, title, excerpt, tags.
 */
export default function BlogCard({ post, index = 0, priority = false }: BlogCardProps) {
  const reduceMotion = useReducedMotion();
  const cover = post.coverImage?.asset?._ref
    ? urlFor(post.coverImage).url()
    : null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: (index % 2) * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug.current}`}
        aria-label={`Read post: ${post.title}`}
        className="group block h-full"
      >
        <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan/40 group-hover:shadow-glow-cyan">
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-background">
            {cover ? (
              <Image
                src={cover}
                alt={post.coverImage?.alt || `Cover image for ${post.title}`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface via-background to-purple/10">
                <FileText size={40} className="text-purple-light/50" aria-hidden="true" />
              </div>
            )}
          </div>

          <p className="font-mono text-xs text-muted-light">
            {formatDate(post.publishedAt)} · {readingTimeLabel(post.body)}
          </p>
          <h3 className="mt-2 font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-cyan">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted-light">{post.excerpt}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {(post.tags ?? []).slice(0, 3).map((tag) => (
              <Badge key={tag} variant="purple">
                {tag}
              </Badge>
            ))}
            {(post.tags ?? []).length > 3 && (
              <Badge variant="muted">+{(post.tags ?? []).length - 3}</Badge>
            )}
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-cyan">
            Read Post
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
