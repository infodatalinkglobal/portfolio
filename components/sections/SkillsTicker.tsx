const SKILLS = [
  "Python",
  "LangChain",
  "OpenAI API",
  "CrewAI",
  "AutoGen",
  "HuggingFace",
  "FastAPI",
  "Next.js",
  "React",
  "Tailwind",
  "Git",
  "Docker",
  "Vercel",
];

/**
 * Infinite horizontal skills ticker (2.1) — pure CSS animation
 * (`animate-ticker`, keyframes in tailwind.config.ts), content duplicated
 * once so the -50% translate loops seamlessly. Edge fade via .ticker-mask.
 */
export default function SkillsTicker() {
  const row = [...SKILLS, ...SKILLS];

  return (
    <div className="border-y border-line bg-surface/30 py-5">
      <div className="ticker-mask overflow-hidden" aria-label="Tech stack">
        <ul className="flex w-max animate-ticker">
          {row.map((skill, i) => (
            <li
              key={`${skill}-${i}`}
              className="flex items-center whitespace-nowrap font-mono text-sm text-muted-light"
              aria-hidden={i >= SKILLS.length ? true : undefined}
            >
              <span className="px-6">{skill}</span>
              <span aria-hidden="true" className="text-cyan/40">
                ✦
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
