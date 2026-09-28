# agent.md — AI Engineer Portfolio

## 🧠 Project Context

You are building a **professional portfolio website** for an AI Engineer student.
The site targets **AI/ML recruiters, startup founders, and freelance clients**.
The niche focus is **AI Agents**.

### Goals
- Land a full-time AI engineering role
- Attract freelance clients (small businesses)
- Showcase AI agent projects

### Design Direction
- **Theme:** Futuristic / dark / techy / AI-themed
- **Colors:** Background `#0A0A0F`, Accent Cyan `#00F0FF`, Accent Purple `#8B5CF6`, Accent Green `#00FF88`, Text `#E4E4E7`, Muted `#71717A`, Card BG `#12121A`, Border `#1E1E2E`
- **Fonts:** `JetBrains Mono` (headings) + `Inter` (body) + `Fira Code` (code blocks)
- **Effects:** Glow on hover, gradient text (cyan→purple), dot grid hero background, typewriter animation, smooth page transitions

### Tech Stack
| Layer | Tool |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| CMS + Admin | Sanity.io (free tier) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Forms | Formspree (free tier) |
| Hosting | Vercel |

### Site Map
/ → Home /projects → Projects grid /projects/[slug] → Project case study /blog → Blog listing /blog/[slug] → Blog post /about → About + skills /contact → Contact form /admin → Sanity Studio (admin panel)

---

## 📐 Rules for the Agent

- Use **Next.js App Router** (`app/` directory), never `pages/`
- Use **Tailwind CSS** utility classes only — no inline styles, no external CSS files except globals
- Every component must be **mobile-first responsive**
- All pages must have proper **`<title>` and `<meta>` tags** via Next.js `metadata` API
- Use **Framer Motion** for all animations — always respect `prefers-reduced-motion`
- All images must use **Next.js `<Image>`** component with proper `alt` text
- All links must use **Next.js `<Link>`** component
- Use **Sanity client** for all content fetching (projects, blog posts)
- Never hardcode content that should come from Sanity
- Placeholder/skeleton states must exist for every Sanity-fetched section
- Every interactive element must be **keyboard accessible**
- Color contrast must meet **WCAG AA** minimum
- All Sanity fetch functions go in `/lib/sanity.ts`
- All reusable UI components go in `/components/ui/`
- All section-level components go in `/components/sections/`
- All page-level Sanity schemas go in `/sanity/schemas/`
- Mark each module **complete `[x]`** only when:
  - It renders correctly on mobile + desktop
  - It has no console errors
  - Content is fetched from Sanity (where applicable)
  - Animations work and respect reduced motion

---

## ✅ PART 1 — Foundation & Infrastructure

> Goal: Project scaffolding, design system, CMS setup, global layout. No real pages yet — just the bones.

---

### Module 1.1 — Project Scaffolding
- [x] Bootstrap Next.js 14+ app with App Router (Next 16.3, TypeScript, Tailwind, ESLint, App Router)
- [x] Install dependencies: `framer-motion`, `lucide-react`, `next-sanity`, `@sanity/image-url`, `@sanity/vision` (dev only), `@portabletext/react` (+ `@sanity/client`, `sanity` for the embedded studio)
- [x] Set up folder structure: `app/`, `components/{ui,sections,layout}/`, `lib/`, `sanity/schemas/`, `public/{fonts,images}/`
- [x] Add `.env.local` with placeholders (+ committed `.env.example`)
- [x] Configure `tailwind.config.ts` with custom design tokens (colors, fonts, animations) — Tailwind pinned to v3 so the JS config is the source of truth
- [x] Add Google Fonts: `JetBrains Mono`, `Inter`, `Fira Code` via `app/layout.tsx` (next/font)
- [x] Set up global CSS variables in `globals.css` matching the color palette
- [x] Push initial commit to GitHub (per-milestone commits on the session branch)
- [ ] Connect GitHub repo to Vercel — confirm auto-deploy works (**owner task** — see docs/SETUP-CHECKLIST.md §3)

Notes:
- `lucide-react` v1 removed brand icons (GitHub/LinkedIn) → inline SVGs in `components/ui/SocialIcons.tsx`.
- `next-sanity` v13 requires Next 16 → app runs Next 16.3 (satisfies "Next.js 14+").
- Site pages live in the `app/(site)/` route group so the Sanity Studio at `/admin` renders full-bleed without the site chrome.

### Module 1.2 — Sanity CMS Setup
- [ ] Create Sanity project at sanity.io (free tier) — note the Project ID (**owner task** — see docs/SETUP-CHECKLIST.md §1)
- [x] Sanity initialized — `sanity.config.ts` at project root
- [x] Create `/lib/sanity.ts` with: `client`, `urlFor()`, `getProjects()`, `getProjectBySlug()`, `getBlogPosts()`, `getBlogPostBySlug()`, `getFeaturedProjects()`
- [x] Define Sanity schema — `project` (title, slug, description, longDescription, techStack, role, status, liveUrl, githubUrl, thumbnail, featured, publishedAt)
- [x] Define Sanity schema — `blogPost` (title, slug, excerpt, body, tags, coverImage, publishedAt)
- [x] Register both schemas (+ custom `codeBlock` portable-text object for code-block support) in `sanity.config.ts`
- [x] Embed Sanity Studio at `/admin` using `NextStudio` from `next-sanity` (`app/admin/[[...tool]]/page.tsx`)
- [ ] Add `2` seed projects and `1` seed blog post via Studio (**owner task** — one command once the project exists: `node scripts/seed.mjs --token=...`)
- [ ] Confirm Studio loads at `localhost:3000/admin` (needs real Project ID)
- [ ] Add Sanity env vars to Vercel — confirm fetching works in production (**owner task** — see docs/SETUP-CHECKLIST.md §3)

Notes:
- Until a real Project ID is set, `lib/sanity.ts` short-circuits fetches (`isSanityConfigured`) so builds/dev stay clean.
- Case study sections (The Problem / Your Role / Approach / Results) are H2 headings inside `longDescription`, rendered as gradient section headings on the case study page (Module 2.3).

### Module 1.3 — Global Layout & Design System
- [x] Build `components/ui/Button.tsx` — variants `primary`/`secondary`/`ghost`, sizes `sm`/`md`/`lg`, `href` → `Link` | `onClick` → `button`, Framer Motion hover glow
- [x] Build `components/ui/Badge.tsx` — variants `cyan`/`purple`/`green`/`muted` (+ `statusBadgeProps` mapping project status → color/label)
- [x] Build `components/ui/Card.tsx` — dark card, border, cyan hover glow, smooth lift (whileHover)
- [x] Build `components/ui/GradientText.tsx` — cyan→purple gradient, `as` prop for semantic heading level
- [x] Build `components/ui/SectionWrapper.tsx` — consistent padding, max-width, centered, `id` prop
- [x] Build `components/ui/SkeletonCard.tsx` — pulse animation, `role="status"`
- [x] Build `components/layout/Navbar.tsx` — mono logo + cyan accent, 5 links, cyan active underline (animated layoutId), animated mobile hamburger (AnimatePresence), sticky + blur on scroll, `aria-expanded`/`aria-label`, Escape closes
- [x] Build `components/layout/Footer.tsx` — name + tagline, GitHub/LinkedIn icon links (new tab), copyright, glowing top border
- [x] Wrap site layout with `Navbar` + `Footer` (in `app/(site)/layout.tsx` so `/admin` stays chrome-free)
- [x] Add Framer Motion `AnimatePresence` page transition wrapper (used in the site layout)
- [x] Confirm layout renders correctly on mobile + desktop with no errors (`npm run build` clean, verified in preview)

---

## ✅ PART 2 — Pages

> Goal: Build all 7 pages. Each page fetches real content from Sanity where applicable. All pages are responsive and animated.

---

### Module 2.1 — Home Page (`/`)
- [x] **Hero Section** (`components/sections/Hero.tsx`):
  - [x] Full-viewport height dark section, dot-grid CSS background pattern (+ floating dots, 3.1)
  - [x] Availability badge: `"Open to Opportunities"` in green with pulsing dot
  - [x] Name in large `JetBrains Mono` with cyan→purple gradient
  - [x] Typewriter animation cycling through roles (static under reduced motion)
  - [x] Subline: `"I build intelligent AI agents that automate the impossible."`
  - [x] Two CTA buttons: `[View My Work]` (primary) + `[Get In Touch]` (secondary)
  - [x] Framer Motion fade-up stagger on all elements
- [x] **Skills Ticker** (`components/sections/SkillsTicker.tsx`):
  - [x] Infinite horizontal scroll (pure CSS `animate-ticker`, no JS)
  - [x] Tech: Python, LangChain, OpenAI API, CrewAI, AutoGen, HuggingFace, FastAPI, Next.js, React, Tailwind, Git, Docker, Vercel
  - [x] Fades out on left + right edges with gradient mask
- [x] **Featured Projects Section** (`components/sections/FeaturedProjects.tsx`):
  - [x] Heading: `"Featured Work"` — fetches `featured == true`, max 3
  - [x] Each card: thumbnail, title, description, tech stack badges, status badge, `[View Project]` link
  - [x] Hover: cyan glow + subtle lift; `[View All Projects →]` link at bottom
  - [x] Dashed empty state before CMS content exists
- [x] **Latest Blog Posts Section** (`components/sections/LatestPosts.tsx`):
  - [x] Heading: `"Latest Thoughts"` — 2 most recent posts
  - [x] Each card: cover image (or icon placeholder), title, date, excerpt, `[Read More →]`
  - [x] `[View All Posts →]` link at bottom
- [x] **Social Proof Strip** (`components/sections/SocialStrip.tsx`):
  - [x] GitHub + LinkedIn links with icons, school/education one-liner, dividers above + below
- [x] Assemble all sections in order: Hero → Ticker → Featured Projects → Latest Posts → Social Strip
- [x] Add `metadata` export (title + description + OG/Twitter tags)
- [x] Confirm page renders on mobile + desktop with no errors (verified in preview)

### Module 2.2 — Projects Page (`/projects`)
- [x] Build `app/projects/page.tsx`:
  - [x] Heading: `"Projects"` with gradient text; subheading: `"AI agents, tools, and experiments"`
  - [x] Fetch all projects from Sanity, sorted by `publishedAt` descending
  - [x] Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
  - [x] Each card: thumbnail, title, description, tech stack badges, status badge, `[View Project]` button
  - [x] Status badge colors: `live` = green, `in-progress` = cyan, `coming-soon` = muted
  - [x] Framer Motion stagger animation on card entry
- [x] Add `metadata` export (title + description + OG)
- [x] Confirm page renders correctly on mobile + desktop

### Module 2.3 — Project Case Study Page (`/projects/[slug]`)
- [x] Build `app/projects/[slug]/page.tsx`:
  - [x] Fetch project by slug from Sanity; **real 404 status** if not found (verified)
  - [x] `generateStaticParams()` + `generateMetadata()` (project title + description)
- [x] Layout (top to bottom):
  - [x] **Hero banner**: full-width thumbnail + project title + one-line description overlay
  - [x] **Meta bar**: role, status badge, tech stack pills, live URL + GitHub buttons (if available)
  - [x] **The Problem / Your Role / Approach / Results**: H2 headings in `longDescription` render as gradient section headings
  - [x] **Back to Projects** link at bottom
- [x] Render `longDescription` using `@portabletext/react` with custom components (`components/ui/PortableText.tsx`):
  - [x] Code blocks: dark background + `Fira Code` + token colors (tiny zero-dependency highlighter in `lib/highlight.ts`)
  - [x] Headings: gradient text; Links: cyan underline (external links open in new tab)
- [ ] Confirm page renders correctly for both seed projects (**owner task** — needs seed content)

Notes:
- Detail pages use `force-dynamic` + `generateStaticParams()`: known slugs are prerendered at build, unknown slugs always return a true 404.
- Segment `loading.tsx` boundaries were intentionally omitted: a streaming loading shell locks the response status at 200 before `notFound()` resolves, which breaks the real-404 requirement. `SkeletonCard` (module 1.3) remains available; no-data sections show the dashed empty states instead.

### Module 2.4 — Blog Page (`/blog`)
- [x] Build `app/blog/page.tsx`:
  - [x] Heading: `"Blog"` with gradient text; subheading: `"AI agents, tutorials, and thoughts"`
  - [x] Fetch all blog posts from Sanity, sorted by `publishedAt` descending
  - [x] Responsive grid: 1 col (mobile) → 2 col (desktop)
  - [x] Each card: cover image (or icon placeholder), title, date, reading time estimate, excerpt, tags as badges, `[Read Post →]`
  - [x] Framer Motion stagger on card entry
- [x] Add `metadata` export

### Module 2.5 — Blog Post Page (`/blog/[slug]`)
- [x] Build `app/blog/[slug]/page.tsx`:
  - [x] Fetch post by slug; **real 404 status** if not found (verified)
  - [x] `generateStaticParams()` + `generateMetadata()`
- [x] Layout:
  - [x] **Header**: cover image, title (gradient), date, tags, reading time
  - [x] **Body**: rendered portable text (same custom components as case study)
  - [x] **Back to Blog** link at bottom
- [ ] Confirm page renders correctly for seed blog post (**owner task** — needs seed content)

### Module 2.6 — About Page (`/about`)
- [x] Build `app/about/page.tsx`:
  - [x] **Bio section**: 3-paragraph narrative (student, AI agent builder, what drives you) — placeholder copy, edit in the page
  - [x] **Skills grid**: grouped exactly per spec (AI/ML, Backend, Frontend, Tools)
  - [x] Each skill rendered as a glowing badge (hover cyan glow)
  - [x] **Education section**: school, degree, coursework (values from `lib/site.ts`)
  - [x] **Resume download button** → `/resume.pdf` (placeholder PDF generated; replace with your real one)
- [x] Add `metadata` export
- [x] Confirm page renders correctly on mobile + desktop

### Module 2.7 — Contact Page (`/contact`)
- [x] Build `app/contact/page.tsx`:
  - [x] Heading: `"Let's Work Together"` with gradient text; subtext + green `"Available for work"` badge
  - [x] **Contact form** (client `ContactForm.tsx` → `app/api/contact/route.ts` → Formspree; endpoint stays server-side):
    - [x] Fields: Name, Email, Message (textarea), Submit button — all with `<label>`, `aria-invalid`, `aria-describedby`
    - [x] Loading state on submit (spinner on button)
    - [x] Success state: green checkmark + `"Message sent! I'll get back to you soon."`
    - [x] Error state: red message + retry (values preserved); clean 503 JSON when endpoint not configured
    - [x] All fields validated (required, email format, min length)
  - [x] **Direct links section**: Email (mailto + copy to clipboard with feedback), GitHub, LinkedIn
- [x] Add `metadata` export
- [ ] Confirm form sends email to your address via Formspree (**owner task** — needs real endpoint, then test)
- [ ] Add Formspree endpoint to Vercel env vars (**owner task**)

---

## ✅ PART 3 — Polish, Performance & Launch

> Goal: Production-ready. Fast, accessible, beautiful, deployed.

---

### Module 3.1 — Animations & Visual Polish
- [x] Add Framer Motion **page transition** (`AnimatePresence` + fade slide) — shipped early in 1.3
- [x] Add **scroll-triggered** fade-up animations to section headings/content (Framer Motion `whileInView` via `components/ui/Reveal.tsx`)
- [x] Add **hero particle/dot animation** (CSS keyframe floating dots in Hero, 2.1)
- [x] Add **typewriter effect** to hero role line (custom `useTypewriter` hook, 2.1; static under reduced motion)
- [x] Add **hover glow** (cyan `box-shadow`) to all project/blog cards, buttons, and skill badges
- [x] Add **navbar scroll behavior**: transparent → dark + blur on scroll (Framer Motion `useScroll`) — shipped early in 1.3
- [x] Add **skills ticker** smooth infinite loop (pure CSS `animate-ticker`, 2.1)
- [x] All animations have `prefers-reduced-motion` fallback (global CSS + `useReducedMotion` in components)
- [x] Review every page — animations kept restrained: 0.3s page transitions, 0.12s stagger, 300ms hover transitions, `whileInView once:true` (no re-animation on scroll-back); all disabled under reduced motion

### Module 3.2 — SEO & Metadata
- [x] Global metadata in `app/layout.tsx`: title template `"%s | Alex Carter — AI Engineer"`, description, keywords, authors, robots
- [x] Open Graph tags on all pages (title, description, image, url, type) — incl. per-slug URLs in `generateMetadata`
- [x] Twitter Card meta tags (card `summary_large_image` with OG image)
- [x] `app/sitemap.ts` — static routes + all project + blog slugs from Sanity (revalidate 3600)
- [x] `app/robots.ts` — allows all crawlers (disallows `/admin` + `/api/`), points to sitemap
- [x] Favicon: custom `app/favicon.ico` (16/32/48/64 — cyan/purple terminal mark) + `/public/og-image.png` (1200×630, dark themed, ImageMagick-generated)
- [ ] Test OG tags using opengraph.xyz (**owner task** — needs the public URL)

### Module 3.3 — Accessibility Audit
- [x] All headings in correct semantic order — verified on every page (exactly 1×h1, no skipped levels)
- [x] All images have meaningful alt text (decorative overlays/dots use `aria-hidden` / `alt=""`)
- [x] All interactive elements reachable and operable by keyboard only (buttons/links, focusable, Escape closes menu)
- [x] Visible focus ring on all interactive elements (cyan `:focus-visible` outline in globals)
- [x] Color contrast passes WCAG AA — all small-text `text-muted` (#71717A, ~3.9:1) bumped to `muted-light` (#A1A1AA, ~7:1); key pairs verified: cyan on bg 13:1+, purple-light 6.9:1, red-300 error text 5:1+
- [x] No content conveyed by color alone (status badges include text labels)
- [x] All form inputs have associated `<label>` + `aria-invalid` + `aria-describedby` (Module 2.7)
- [x] Navbar mobile menu has proper `aria-expanded` and `aria-label`

### Module 3.4 — Performance Audit
- [x] Images: local assets optimized (woff2 fonts, 66KB og-image.png); Sanity remote images — **upload as .webp** (noted in schema descriptions + checklist)
- [x] Next.js `<Image>` used everywhere with `fill`/`sizes`, `priority` on hero/case-study banners
- [x] Below-the-fold images lazy (Next.js Image default)
- [x] `npm ls` — no unused direct dependencies (two "extraneous" entries are transitive deps of the Sanity stack, not removable)
- [x] Sanity queries use projections (only fetch fields you need)
- [x] ISR on project + blog pages: `revalidate = 60` (verified in route table)
- [ ] Run Lighthouse audit (**owner task** — no Chrome in this sandbox):
  - `npx lighthouse https://YOUR-URL --form-factor=mobile --chrome-flags="--headless"` (and `--form-factor=desktop`)
  - on `/`, one project page, one blog post; fix anything below the targets
- [ ] Achieve targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95 (design targets all: static/ISR pages, minimal JS, self-hosted fonts, no render-blocking beyond preloaded fonts)

### Module 3.5 — Final QA Checklist
- [x] No horizontal-scroll risks in code (max-width containers, responsive 1/2/3-col grids, `overflow-hidden` on ticker/hero, `overflow-x-auto` on code blocks)
- [ ] Test every page at 375px / 768px / 1280px in Chrome, Firefox, Safari (**owner task** — visual pass)
- [x] All navigation links verified — `/`, `/projects`, `/blog`, `/about`, `/contact`, `/admin`, `/resume.pdf` all 200; unknown slugs 404
- [ ] Test contact form — confirm email arrives (**owner task** — needs Formspree endpoint)
- [ ] Test Sanity admin at /admin — add a project/post, confirm it appears (**owner task** — needs Sanity project)
- [x] Resume download — 200, valid PDF
- [x] GitHub + LinkedIn links open in new tab (`target="_blank" rel="noopener noreferrer"`)
- [ ] Confirm Vercel deploy is live and all env vars are set (**owner task**)
- [x] No known hydration risks (deterministic dates, client state initialized server-safe, `initial={false}` transitions); confirm zero console errors in production (**owner task**)

### Module 3.6 — Launch (owner tasks — checklist in docs/SETUP-CHECKLIST.md)
- [ ] Final push to GitHub → import repo in Vercel → set 4 env vars → deploy
- [ ] Verify live URL end-to-end (home, projects, blog, /admin, contact form, sitemap.xml, robots.txt)
- [ ] Submit `https://YOUR-URL/sitemap.xml` to Google Search Console (free)
- [ ] Test OG tags at opengraph.xyz
- [ ] Add portfolio URL to: LinkedIn profile, GitHub profile README, resume PDF, email signature
- [ ] Replace placeholders: `lib/site.ts` (name/email/school/URLs), `public/resume.pdf`, and regenerate `public/og-image.png` + `app/favicon.ico` with your real name
- [ ] Share on LinkedIn with a post about what you built 🎉

---

## 📊 Completion Tracker

| Part | Modules | Status |
|---|---|---|
| Part 1 — Foundation | 1.1 · 1.2 · 1.3 | ✅ (code complete — owner tasks: create Sanity project, connect Vercel) |
| Part 2 — Pages | 2.1 · 2.2 · 2.3 · 2.4 · 2.5 · 2.6 · 2.7 | ✅ (code complete — owner tasks: seed content, test form with real endpoint) |
| Part 3 — Polish & Launch | 3.1 · 3.2 · 3.3 · 3.4 · 3.5 · 3.6 | ✅ (code complete — owner tasks: Lighthouse, browser QA, Vercel deploy, Search Console, social) |
