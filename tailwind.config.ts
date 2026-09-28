import type { Config } from "tailwindcss";

/**
 * Design tokens for the AI Engineer portfolio.
 * Palette + effects defined in agent.md (Part 1.1).
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#12121A",
        line: "#1E1E2E",
        foreground: "#E4E4E7",
        muted: "#71717A",
        // AA-safe shade of the muted color for small text (WCAG 4.5:1)
        "muted-light": "#A1A1AA",
        cyan: "#00F0FF",
        purple: "#8B5CF6",
        // AA-safe shade of the purple accent for small text
        "purple-light": "#A78BFA",
        green: "#00FF88",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        code: ["var(--font-fira-code)", "ui-monospace", "monospace"],
      },
      keyframes: {
        // Infinite horizontal skills ticker (content is duplicated, so -50% loops seamlessly)
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Lightweight floating dots for the hero (Part 3.1)
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        // Pulsing availability dot
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 240, 255, 0.3)",
        "glow-cyan-lg": "0 0 40px rgba(0, 240, 255, 0.45)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.35)",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(rgba(228, 228, 231, 0.13) 1px, transparent 1px)",
        "gradient-radial-cyan":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 240, 255, 0.08), transparent 70%)",
        "gradient-radial-purple":
          "radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139, 92, 246, 0.08), transparent 70%)",
      },
      backgroundSize: {
        "dot-grid": "24px 24px",
      },
    },
  },
  plugins: [],
};

export default config;
