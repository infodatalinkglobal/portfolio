import { cn } from "@/lib/utils";

type BadgeVariant = "cyan" | "purple" | "green" | "muted";

const variantClasses: Record<BadgeVariant, string> = {
  cyan: "border-cyan/40 bg-cyan/10 text-cyan",
  purple: "border-purple/40 bg-purple/10 text-purple-light",
  green: "border-green/40 bg-green/10 text-green",
  muted: "border-line bg-surface text-muted-light",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Pill badge for status labels and tech-stack tags (spec: Module 1.3).
 * Status colors: live = green, in-progress = cyan, coming-soon = muted.
 */
export default function Badge({
  children,
  variant = "muted",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Map a project status to its badge variant + label. */
export function statusBadgeProps(
  status: string
): { variant: BadgeVariant; label: string } {
  switch (status) {
    case "live":
      return { variant: "green", label: "Live" };
    case "in-progress":
      return { variant: "cyan", label: "In progress" };
    default:
      return { variant: "muted", label: "Coming soon" };
  }
}
