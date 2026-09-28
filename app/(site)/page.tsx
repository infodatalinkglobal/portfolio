import type { Metadata } from "next";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import LatestPosts from "@/components/sections/LatestPosts";
import SkillsTicker from "@/components/sections/SkillsTicker";
import SocialStrip from "@/components/sections/SocialStrip";
import { siteConfig } from "@/lib/site";

/** ISR: revalidate every 60 s (spec 3.4). */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
};

/**
 * Home (Module 2.1): Hero → Skills Ticker → Featured Projects →
 * Latest Posts → Social Strip.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SkillsTicker />
      <FeaturedProjects />
      <LatestPosts />
      <SocialStrip />
    </>
  );
}
