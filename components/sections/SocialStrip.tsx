import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/site";

const linkClasses =
  "inline-flex items-center gap-2 font-mono text-sm text-foreground/80 transition-colors hover:text-cyan";

/**
 * Social proof strip (2.1): GitHub + LinkedIn links with icons,
 * education one-liner, subtle dividers above + below.
 */
export default function SocialStrip() {
  return (
    <div className="border-y border-line bg-surface/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 py-8 sm:flex-row sm:gap-8 sm:px-6 lg:px-8">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in new tab)"
          className={linkClasses}
        >
          <GitHubIcon size={18} aria-hidden="true" />
          GitHub
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile (opens in new tab)"
          className={linkClasses}
        >
          <LinkedInIcon size={18} aria-hidden="true" />
          LinkedIn
        </a>
        <span aria-hidden="true" className="hidden text-line sm:inline">
          ───
        </span>
        <p className="text-center text-sm text-muted-light">
          {siteConfig.degree} · {siteConfig.school}
        </p>
      </div>
    </div>
  );
}
