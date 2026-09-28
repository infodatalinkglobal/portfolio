import Link from "next/link";
import BlogCard from "@/components/ui/BlogCard";
import EmptyState from "@/components/ui/EmptyState";
import GradientText from "@/components/ui/GradientText";
import Reveal from "@/components/ui/Reveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getBlogPosts } from "@/lib/sanity";

/**
 * Home section: 2 most recent blog posts from Sanity (2.1).
 */
export default async function LatestPosts() {
  const posts = (await getBlogPosts()).slice(0, 2);

  return (
    <SectionWrapper id="latest-thoughts" wide>
      <Reveal>
        <p className="font-mono text-sm text-muted-light">
          {"// 02 — from the blog"}
        </p>
        <h2 className="mt-2 font-mono text-3xl font-bold sm:text-4xl">
          <GradientText>Latest Thoughts</GradientText>
        </h2>
      </Reveal>

      {posts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <BlogCard key={post._id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-10"
          title="// no posts yet"
          hint="Add a blog post in Sanity (docs/SETUP-CHECKLIST.md) — the two most recent appear here automatically."
        />
      )}

      {posts.length > 0 && (
        <Reveal className="mt-10 text-center">
          <Link
            href="/blog"
            className="font-mono text-sm text-cyan underline underline-offset-4 transition-colors hover:text-cyan/80"
          >
            View All Posts →
          </Link>
        </Reveal>
      )}
    </SectionWrapper>
  );
}
