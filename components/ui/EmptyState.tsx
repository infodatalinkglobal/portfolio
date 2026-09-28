import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  hint?: string;
  className?: string;
}

/**
 * Shown for Sanity-fed sections before the CMS is connected or has content
 * (spec: placeholder states for every Sanity-fetched section).
 */
export default function EmptyState({ title, hint, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-line bg-surface/40 px-6 py-14 text-center",
        className
      )}
    >
      <p className="font-mono text-sm text-muted-light">{title}</p>
      {hint && <p className="mx-auto mt-3 max-w-md text-sm text-muted">{hint}</p>}
    </div>
  );
}
