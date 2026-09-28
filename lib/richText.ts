import { toPlainText } from "@portabletext/react";
import type { RichText } from "./sanity";

/** Flatten portable text (blocks + code blocks) to plain text. */
export function richTextToText(value: RichText | null | undefined): string {
  if (!value || value.length === 0) return "";
  return toPlainText(value);
}

/** Rough reading-time estimate for a portable text body (~200 wpm). */
export function readingTimeLabel(value: RichText | null | undefined): string {
  const words = richTextToText(value)
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
