import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Allows all crawlers (except the private admin + API), points to sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
