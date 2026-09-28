import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects, isSanityConfigured } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";

/** Re-fetch slugs hourly (spec 3.2: auto-generates from Sanity). */
export const revalidate = 3600;

/**
 * XML sitemap: static pages + every project + blog post slug from Sanity.
 * Until the CMS is connected, only the static routes are listed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  if (!isSanityConfigured) return staticRoutes;

  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug.current}`,
      lastModified: new Date(project.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
