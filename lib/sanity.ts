import imageUrlBuilder from "@sanity/image-url";
import { createClient, type SanityClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";

/* ------------------------------------------------------------------ */
/* Client                                                              */
/* ------------------------------------------------------------------ */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

/**
 * True once a real Sanity Project ID has been set in the environment.
 * Until then every fetcher returns empty results instead of hitting a
 * non-existent API — this keeps `next build` and the dev server clean
 * before the CMS is connected (see docs/SETUP-CHECKLIST.md).
 */
export const isSanityConfigured =
  projectId.length > 0 && !projectId.toLowerCase().includes("replace");

export const client: SanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

/** Build a CDN URL for a Sanity image asset (spec: urlFor() helper). */
export function urlFor(source: object) {
  return imageUrlBuilder(client).image(source);
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SanityImage {
  _type?: string;
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: { lqip?: string };
  };
  alt?: string;
}

export interface CodeBlock {
  _type: "codeBlock";
  _key?: string;
  language?: string;
  code?: string;
}

/** Portable text blocks plus the custom `codeBlock` object. */
export type RichText = Array<PortableTextBlock | CodeBlock>;

export type ProjectStatus = "live" | "in-progress" | "coming-soon";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  longDescription: RichText;
  techStack: string[];
  role: string;
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  thumbnail?: SanityImage;
  featured?: boolean;
  publishedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: RichText;
  tags: string[];
  coverImage?: SanityImage;
  publishedAt: string;
}

/* ------------------------------------------------------------------ */
/* Fetchers — projections only, never pull entire documents (3.4)      */
/* ------------------------------------------------------------------ */

/**
 * ISR (spec 3.4): pages that fetch from Sanity should export
 * `export const revalidate = REVALIDATE_SECONDS;`
 * (Next.js 16 / @sanity/client v8 handle caching at the page level.)
 */
export const REVALIDATE_SECONDS = 60;

const PROJECT_PROJECTION = `{
  _id,
  title,
  slug,
  description,
  longDescription,
  techStack,
  role,
  status,
  liveUrl,
  githubUrl,
  thumbnail -> { _type, alt, asset -> { _ref, metadata -> { lqip } } },
  featured,
  publishedAt
}`;

const BLOG_POST_PROJECTION = `{
  _id,
  title,
  slug,
  excerpt,
  body,
  tags,
  coverImage -> { _type, alt, asset -> { _ref, metadata -> { lqip } } },
  publishedAt
}`;

/** All projects, newest first. */
export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return [];
  const query = `*[_type == "project" && defined(publishedAt)] | order(publishedAt desc) ${PROJECT_PROJECTION}`;
  return client.fetch<Project[]>(query);
}

/** One project by slug (null when missing). */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured) return null;
  const query = `*[_type == "project" && slug.current == $slug][0] ${PROJECT_PROJECTION}`;
  return client.fetch<Project | null>(query, { slug });
}

/** Featured projects for the home page (max 3). */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  if (!isSanityConfigured) return [];
  const query = `*[_type == "project" && featured == true] | order(publishedAt desc)[0...${limit}] ${PROJECT_PROJECTION}`;
  return client.fetch<Project[]>(query);
}

/** All blog posts, newest first. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];
  const query = `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) ${BLOG_POST_PROJECTION}`;
  return client.fetch<BlogPost[]>(query);
}

/** One blog post by slug (null when missing). */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) return null;
  const query = `*[_type == "blogPost" && slug.current == $slug][0] ${BLOG_POST_PROJECTION}`;
  return client.fetch<BlogPost | null>(query, { slug });
}
