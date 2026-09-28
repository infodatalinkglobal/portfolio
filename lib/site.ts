/**
 * Single source of truth for personal identity + contact details.
 *
 * ⚠️  ALL VALUES BELOW ARE PLACEHOLDERS — swap in your real details.
 *
 * Projects and blog posts are intentionally NOT defined here —
 * that content always comes from Sanity (agent.md rule).
 */
export const siteConfig = {
  name: "Alex Carter",
  role: "AI Engineer",
  tagline: "I build intelligent AI agents that automate the impossible.",
  description:
    "Portfolio of Alex Carter, an AI Engineer specializing in intelligent agents — AI agent projects, tutorials, and ways to work together.",
  // Used for metadataBase / OG tags. Update to your Vercel URL after deploying.
  url: "https://alexcarter-ai.vercel.app",
  email: "hello@alexcarter.dev",
  github: "https://github.com/your-github-username",
  linkedin: "https://www.linkedin.com/in/your-linkedin-handle",
  school: "Your University",
  degree: "B.Sc. Computer Science",
  availability: "Open to Opportunities",
} as const;
