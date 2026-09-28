import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";

/** Dark-themed 404 so broken links match the design system. */
export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-muted-light">
        {"// error 404 — page not found"}
      </p>
      <h1 className="mt-4 font-mono text-6xl font-bold sm:text-7xl">
        <GradientText>404</GradientText>
      </h1>
      <p className="mt-6 max-w-md text-muted-light">
        This page doesn&apos;t exist — it may have been moved, or the link is
        stale.
      </p>
      <div className="mt-10">
        <Button href="/" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
