import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/*
 * Self-hosted variable fonts (Fontsource woff2 in public/fonts/) loaded
 * through next/font — same rendering as Google Fonts, zero runtime network
 * dependency (sandbox-safe, faster LCP).
 */
const inter = localFont({
  variable: "--font-inter",
  src: "../public/fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
});

const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  src: "../public/fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
});

const firaCode = localFont({
  variable: "--font-fira-code",
  src: "../public/fonts/fira-code-latin-wght-normal.woff2",
  weight: "300 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name} — ${siteConfig.role}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI Engineer",
    "AI Agents",
    "LangChain",
    "OpenAI API",
    "CrewAI",
    "AutoGen",
    "HuggingFace",
    "Freelance",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} — ${siteConfig.role}`,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${firaCode.variable} flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased`}
      >
        {/* Skip link for keyboard users (Part 3.3) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-cyan"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
