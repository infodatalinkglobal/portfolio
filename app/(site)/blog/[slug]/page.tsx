import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import PortableTextView from "@/components/ui/PortableText";
import Reveal from "@/components/ui/Reveal";
import { getBlogPostBySlug, getBlogPosts, urlFor } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";
import { readingTimeLabel } from "@/lib/richText";
import { formatDate } from "@/lib/utils";

/**
 * Rendered on demand so unknown slugs always return a real 404 status
 * (spec 2.5: "Return 404 if not found"). Known slugs come from
 * generateStaticParams below; when Sanity has no data yet, the route is
 * fully dynamic and 404s correctly.
 */
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug.current}`,
    },
  };
}

/** Blog post (Module 2.5). */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const cover = post.coverImage?.asset?._ref
    ? urlFor(post.coverImage).url()
    : null;

  return (
    <article>
      {/* Cover */}
      <div className="relative h-[300px] w-full overflow-hidden sm:h-[400px]">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface via-background to-purple/10"
          >
            <FileText size={56} className="text-purple-light/40" />
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header: date, reading time, title, tags */}
        <Reveal>
          <header className="-mt-16 relative">
            <div className="rounded-xl border border-line bg-surface/90 p-6 backdrop-blur-md sm:p-8">
              <p className="font-mono text-xs text-muted-light">
                {formatDate(post.publishedAt)} · {readingTimeLabel(post.body)}
              </p>
              <h1 className="mt-3 font-mono text-3xl font-bold leading-tight sm:text-4xl">
                <GradientText>{post.title}</GradientText>
              </h1>
              {(post.tags ?? []).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(post.tags ?? []).map((tag) => (
                    <Badge key={tag} variant="purple">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </header>
        </Reveal>

        {/* Body (same custom portable-text components as the case study) */}
        <div className="mt-8">
          <PortableTextView value={post.body} />
        </div>

        <div className="mb-4 mt-16 border-t border-line pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-cyan transition-colors hover:text-cyan/80"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
