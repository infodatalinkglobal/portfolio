import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  /** Render a thumbnail placeholder block. */
  media?: boolean;
  className?: string;
}

/**
 * Animated loading skeleton for project + blog cards (spec: Module 1.3).
 * `role="status"` announces the loading state to screen readers.
 */
export default function SkeletonCard({
  media = true,
  className,
}: SkeletonCardProps) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={cn(
        "animate-pulse rounded-xl border border-line bg-surface p-5",
        className
      )}
    >
      {media && (
        <div className="mb-4 aspect-[16/9] w-full rounded-lg bg-line/60" />
      )}
      <div className="mb-3 h-5 w-2/3 rounded bg-line/60" />
      <div className="mb-2 h-3 w-full rounded bg-line/40" />
      <div className="mb-4 h-3 w-4/5 rounded bg-line/40" />
      <div className="flex flex-wrap gap-2">
        <div className="h-6 w-16 rounded-full bg-line/50" />
        <div className="h-6 w-20 rounded-full bg-line/50" />
        <div className="h-6 w-14 rounded-full bg-line/50" />
      </div>
    </div>
  );
}
