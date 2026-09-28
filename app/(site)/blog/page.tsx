import type { Metadata } from "next";
import BlogCard from "@/components/ui/BlogCard";
import EmptyState from "@/components/ui/EmptyState";
import GradientText from "@/components/ui/GradientText";
import Reveal from "@/components/ui/Reveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getBlogPosts } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";

/** ISR: revalidate every 60 s (spec 3.4). */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "AI agents, tutorials, and thoughts.",
  openGraph: {
    title: "Blog",
    description: "AI agents, tutorials, and thoughts.",
    type: "website",
    url: `${siteConfig.url}/blog`,
  },
};

/** Blog listing (Module 2.4). */
export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <SectionWrapper className="min-h-[60dvh]">
      <Reveal>
        <p className="font-mono text-sm text-muted-light">
          {"// notes from the lab"}
        </p>
        <h1 className="mt-2 font-mono text-4xl font-bold sm:text-5xl">
          <GradientText>Blog</GradientText>
        </h1>
        <p className="mt-3 text-lg text-muted-light">
          AI agents, tutorials, and thoughts
        </p>
      </Reveal>

      {posts.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <BlogCard key={post._id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-12"
          title="// no posts yet"
          hint="Add blog posts in Sanity (docs/SETUP-CHECKLIST.md) — they appear here automatically."
        />
      )}
    </SectionWrapper>
  );
}
