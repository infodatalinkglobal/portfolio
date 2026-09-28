import type { Metadata } from "next";
import { Download, GraduationCap, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import Reveal from "@/components/ui/Reveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { siteConfig } from "@/lib/site";

const SKILL_GROUPS = [
  {
    title: "AI / ML",
    skills: ["Python", "LangChain", "OpenAI API", "CrewAI", "AutoGen", "HuggingFace"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Node.js"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "Vercel", "GitHub Copilot"],
  },
] as const;

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — AI engineer and agent builder. Skills, education, and resume.`,
  openGraph: {
    title: "About",
    description: `About ${siteConfig.name} — AI engineer and agent builder.`,
    type: "website",
    url: `${siteConfig.url}/about`,
  },
};

/** About + skills (Module 2.6). Bio/education are placeholders — edit the copy below. */
export default function AboutPage() {
  return (
    <SectionWrapper className="min-h-[60dvh]">
      <Reveal>
        <p className="font-mono text-sm text-muted-light">{"// about me"}</p>
        <h1 className="mt-2 font-mono text-4xl font-bold sm:text-5xl">
          <GradientText>About</GradientText>
        </h1>
      </Reveal>

      {/* Bio */}
      <Reveal className="mt-12">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-light">
          <p>
            I&apos;m <span className="text-foreground">{siteConfig.name}</span>, an
            AI engineering student who spends most of my time building
            autonomous agents — systems that plan, call tools, and finish real
            work without a human in the loop for every step.
          </p>
          <p>
            What drives me is the gap between a demo agent and a shipped one.
            Retrieval that actually answers, context that doesn&apos;t blow the
            budget, evaluation that catches hallucinations before your client
            does. I care about the unglamorous parts that make agents
            trustworthy enough to point at production.
          </p>
          <p>
            I&apos;m looking for a full-time AI engineering role where I can own
            agent systems end to end — and I take on select freelance projects
            for small businesses that want automation done properly.
          </p>
        </div>
      </Reveal>

      {/* Skills grid */}
      <Reveal className="mt-16">
        <h2 className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
          Skills
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <h3 className="font-mono text-sm uppercase tracking-widest text-cyan">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="cyan" className="transition-shadow duration-300 hover:shadow-glow-cyan">
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Education + resume */}
      <Reveal className="mt-16">
        <h2 className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
          Education
        </h2>
        <div className="mt-6 rounded-xl border border-line bg-surface p-6">
          <div className="flex items-start gap-4">
            <div
              className="rounded-lg border border-cyan/30 bg-cyan/5 p-3 text-cyan"
              aria-hidden="true"
            >
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="font-mono text-lg font-semibold text-foreground">
                {siteConfig.degree}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-light">
                <MapPin size={14} aria-hidden="true" />
                {siteConfig.school}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-light">
                Relevant coursework: Machine Learning, Natural Language
                Processing, Databases, Cloud Computing, Software Engineering.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button href="/resume.pdf" download size="lg">
            <Download size={18} aria-hidden="true" /> Download Resume
          </Button>
          <p className="mt-3 font-mono text-xs text-muted-light">
            {"// placeholder PDF — replace public/resume.pdf with your real resume"}
          </p>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
