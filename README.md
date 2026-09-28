# Alex Carter — AI Engineer Portfolio

A futuristic, dark, AI-themed portfolio website for an AI Engineer specializing in **AI agents**.
Built for AI/ML recruiters, startup founders, and freelance clients.

## Stack

| Layer      | Tool                                          |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript)           |
| Styling    | Tailwind CSS v3 (custom design tokens)        |
| CMS        | Sanity Studio (embedded at `/admin`)          |
| Animations | Framer Motion (respects reduced motion)       |
| Icons      | Lucide React                                  |
| Forms      | Formspree                                     |
| Hosting    | Vercel                                        |

## Quickstart

```bash
cp .env.example .env.local   # then fill in real values (docs/SETUP-CHECKLIST.md)
npm install
npm run dev                  # http://localhost:3000
```

> Until a real Sanity Project ID is set, the site renders cleanly with empty
> states — no fetches hit a non-existent API. The same is true for the
> Formspree endpoint (the contact form activates once it's set).

## Environment variables

| Variable                        | Where             | Description                          |
| ------------------------------- | ----------------- | ------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `.env.local`, Vercel | Your Sanity project ID           |
| `NEXT_PUBLIC_SANITY_DATASET`    | `.env.local`, Vercel | Dataset name (default `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION`| `.env.local`, Vercel | API version (default `2024-01-01`)  |
| `FORMSPREE_ENDPOINT`            | `.env.local`, Vercel | Contact form endpoint              |

## Structure

```
app/
  (site)/            # public pages (navbar + footer chrome)
    page.tsx         # home
    projects/ blog/ about/ contact/
  admin/[[...tool]]/ # embedded Sanity Studio
components/
  ui/                # Button, Badge, Card, GradientText, SectionWrapper, SkeletonCard, SocialIcons
  layout/            # Navbar, Footer, PageTransition
  sections/          # home-page sections (Part 2)
lib/
  sanity.ts          # client + all Sanity fetchers
  site.ts            # ⚠️ placeholder identity — swap in your real details
  utils.ts
sanity/
  schemas/           # project, blogPost, codeBlock
sanity.config.ts     # Sanity Studio config
scripts/seed.mjs     # optional: seeds 2 demo projects + 1 demo post
docs/
  agent.md           # full build spec + completion tracker
  SETUP-CHECKLIST.md # Sanity / Formspree / Vercel setup
```

## Status

- [x] **Part 1** — foundation & infrastructure (scaffold, design system, Sanity CMS, global layout)
- [ ] **Part 2** — pages (home, projects, case studies, blog, about, contact)
- [ ] **Part 3** — polish, performance & launch

See `docs/agent.md` for the module-by-module tracker.
