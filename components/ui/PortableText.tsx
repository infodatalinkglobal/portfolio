"use client";

import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { CodeBlock, RichText } from "@/lib/sanity";
import { highlightCode, type TokenColor } from "@/lib/highlight";
import GradientText from "./GradientText";

const tokenColor: Record<TokenColor, string> = {
  comment: "italic text-muted-light",
  string: "text-green",
  number: "text-purple-light",
  keyword: "text-cyan",
  plain: "text-foreground/90",
};

/** Styled code block: dark bg, Fira Code, language label, token colors (2.3). */
function CodeBlockView({ value }: { value: CodeBlock }) {
  const language = value.language ?? "text";
  const tokens = highlightCode(value.code ?? "", language);

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-line bg-background">
      <div className="border-b border-line bg-surface px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-light">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-code text-sm leading-relaxed">
        <code>
          {tokens.map((token, i) => (
            <span key={i} className={tokenColor[token.color]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/**
 * Shared portable-text renderer for case studies (2.3) and blog posts (2.5).
 * Headings → gradient text, links → cyan underline, code → Fira Code blocks.
 * Author H1/H2 inside content are mapped to h2/h3 so each page keeps a single
 * semantic h1 (Part 3.3).
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-foreground/90">{children}</p>
    ),
    h1: ({ children }) => (
      <GradientText as="h2" className="mb-4 mt-12 font-mono text-2xl font-bold sm:text-3xl">
        {children}
      </GradientText>
    ),
    h2: ({ children }) => (
      <GradientText as="h2" className="mb-4 mt-12 font-mono text-2xl font-bold sm:text-3xl">
        {children}
      </GradientText>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-mono text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 font-mono text-lg font-semibold text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-cyan/60 pl-4 italic text-muted-light">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-foreground/90 marker:text-cyan">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-foreground/90 marker:text-cyan">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    em: ({ children }) => <em className="italic text-foreground">{children}</em>,
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-code text-sm text-cyan">
        {children}
      </code>
    ),
    // Sanity's link mark (v8: links are marks, not top-level components)
    link: ({ children, value }) => {
      const href = value?.href;
      const external = typeof href === "string" && href.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-cyan underline underline-offset-4 transition-colors hover:text-cyan/80"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    codeBlock: ({ value }) => <CodeBlockView value={value as CodeBlock} />,
  },
};

export default function PortableTextView({ value }: { value: RichText }) {
  return <PortableText value={value} components={components} />;
}
