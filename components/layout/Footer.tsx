import { siteConfig } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const iconLinkClasses =
  "rounded-md border border-line bg-surface p-2.5 text-foreground/80 transition-all duration-300 hover:border-cyan/50 hover:text-cyan hover:shadow-glow-cyan";

/**
 * Site footer: name + tagline, social links, copyright,
 * glowing top border (spec: Module 1.3).
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line">
      {/* Subtle glow line */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <div>
          <p className="font-mono text-sm text-foreground">
            {siteConfig.name}
            <span className="text-cyan">_</span>
          </p>
          <p className="mt-1 text-sm text-muted-light">{siteConfig.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className={iconLinkClasses}
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className={iconLinkClasses}
          >
            <LinkedInIcon size={18} />
          </a>
        </div>

        <p className="font-mono text-xs text-muted-light">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
