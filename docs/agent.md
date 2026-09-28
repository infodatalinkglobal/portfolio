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
- [ ] **Hero Section** (`components/sections/Hero.tsx`):
  - Full-viewport height dark section, dot-grid CSS background pattern
  - Availability badge: `"Open to Opportunities"` in green with pulsing dot
  - Name in large `JetBrains Mono` with cyan→purple gradient
  - Typewriter animation cycling through roles: `"AI Engineer"`, `"Agent Builder"`, `"Freelance Dev"`
  - Subline: `"I build intelligent AI agents that automate the impossible."`
  - Two CTA buttons: `[View My Work]` (primary) + `[Get In Touch]` (secondary)
  - Framer Motion fade-up stagger on all elements
- [ ] **Skills Ticker** (`components/sections/SkillsTicker.tsx`):
  - Infinite horizontal scroll (CSS animation, no JS)
  - Tech: Python, LangChain, OpenAI API, CrewAI, AutoGen, HuggingFace, FastAPI, Next.js, React, Tailwind, Git, Docker, Vercel
  - Fades out on left + right edges with gradient mask
- [ ] **Featured Projects Section** (`components/sections/FeaturedProjects.tsx`):
  - Heading: `"Featured Work"`
  - Fetch projects from Sanity where `featured == true`
  - Show `SkeletonCard` while loading; max 3 cards
  - Each card: thumbnail, title, description, tech stack badges, status badge, `[View Project]` link
  - Hover: cyan glow + subtle lift; `[View All Projects →]` link at bottom
- [ ] **Latest Blog Posts Section** (`components/sections/LatestPosts.tsx`):
  - Heading: `"Latest Thoughts"`
  - Fetch 2 most recent posts from Sanity
  - Each card: cover image (or placeholder), title, date, excerpt, `[Read More →]`
  - `[View All Posts →]` link at bottom
- [ ] **Social Proof Strip** (`components/sections/SocialStrip.tsx`):
  - GitHub link with icon, LinkedIn link with icon, school/education one-liner
  - Subtle divider line above + below
- [ ] Assemble all sections in `app/page.tsx` in order: Hero → Ticker → Featured Projects → Latest Posts → Social Strip
- [ ] Add `metadata` export to `app/page.tsx` (title + description + OG tags)
- [ ] Confirm page renders on mobile + desktop with no errors

### Module 2.2 — Projects Page (`/projects`)
- [ ] Build `app/projects/page.tsx`:
  - Heading: `"Projects"` with gradient text
  - Subheading: `"AI agents, tools, and experiments"`
  - Fetch all projects from Sanity, sorted by `publishedAt` descending
  - Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
  - Show `SkeletonCard` while loading
  - Each card: thumbnail, title, description, tech stack badges, status badge, `[View Project]` button
  - Status badge colors: `live` = green, `in-progress` = cyan, `coming-soon` = muted
  - Framer Motion stagger animation on card entry
- [ ] Add `metadata` export (title + description + OG)
- [ ] Confirm page renders correctly on mobile + desktop

### Module 2.3 — Project Case Study Page (`/projects/[slug]`)
- [ ] Build `app/projects/[slug]/page.tsx`:
  - Fetch project by slug from Sanity; return 404 if not found
  - `generateStaticParams()` + `generateMetadata()` (project title + description)
- [ ] Layout (top to bottom):
  - **Hero banner**: full-width thumbnail + project title + one-line description overlay
  - **Meta bar**: role, status badge, tech stack pills, live URL + GitHub buttons (if available)
  - **The Problem**: section heading + portable text content
  - **Your Role**: section heading + portable text
  - **Approach / Process**: section heading + portable text (supports code blocks)
  - **Results / Outcome**: section heading + portable text
  - **Back to Projects** link at bottom
- [ ] Render `longDescription` using `@portabletext/react` with custom components:
  - Code blocks: styled dark background + `Fira Code` + syntax highlight colors
  - Headings: gradient text
  - Links: cyan underline
- [ ] Confirm page renders correctly for both seed projects

### Module 2.4 — Blog Page (`/blog`)
- [ ] Build `app/blog/page.tsx`:
  - Heading: `"Blog"` with gradient text
  - Subheading: `"AI agents, tutorials, and thoughts"`
  - Fetch all blog posts from Sanity, sorted by `publishedAt` descending
  - Responsive grid: 1 col (mobile) → 2 col (desktop)
  - Each card: cover image (or dark placeholder with post icon), title, date, reading time estimate, excerpt, tags as badges, `[Read Post →]`
  - Framer Motion stagger on card entry
- [ ] Add `metadata` export

### Module 2.5 — Blog Post Page (`/blog/[slug]`)
- [ ] Build `app/blog/[slug]/page.tsx`:
  - Fetch post by slug; return 404 if not found
  - `generateStaticParams()` + `generateMetadata()`
- [ ] Layout:
  - **Header**: cover image, title (gradient), date, tags, reading time
  - **Body**: rendered portable text (same custom components as case study)
  - **Back to Blog** link at bottom
- [ ] Confirm page renders correctly for seed blog post

### Module 2.6 — About Page (`/about`)
- [ ] Build `app/about/page.tsx`:
  - **Bio section**: 2–3 paragraph narrative (student, AI agent builder, what drives you)
  - **Skills grid**: grouped by category:
    - AI/ML: Python, LangChain, OpenAI API, CrewAI, AutoGen, HuggingFace
    - Backend: FastAPI, Node.js
    - Frontend: Next.js, React, Tailwind CSS
    - Tools: Git, Docker, Vercel, GitHub Copilot
  - Each skill rendered as a glowing badge
  - **Education section**: school name, degree, relevant coursework
  - **Resume download button**: links to `/resume.pdf`
- [ ] Add `metadata` export
- [ ] Confirm page renders correctly on mobile + desktop

### Module 2.7 — Contact Page (`/contact`)
- [ ] Build `app/contact/page.tsx`:
  - Heading: `"Let's Work Together"` with gradient text
  - Subtext: `"Open to full-time roles and freelance projects"`
  - **Contact form** (connected to Formspree):
    - Fields: Name, Email, Message (textarea), Submit button
    - Loading state on submit (spinner on button)
    - Success state: green checkmark + `"Message sent! I'll get back to you soon."`
    - Error state: red message + retry option
    - All fields validated (required, email format), keyboard accessible
  - **Direct links section**: Email (mailto + copy to clipboard), GitHub, LinkedIn
  - **Availability badge**: `"Available for work"` in green
- [ ] Add `metadata` export
- [ ] Confirm form sends email to your address via Formspree (needs real endpoint)
- [ ] Add Formspree endpoint to Vercel env vars (**owner task**)

---

## ✅ PART 3 — Polish, Performance & Launch

> Goal: Production-ready. Fast, accessible, beautiful, deployed.

---

### Module 3.1 — Animations & Visual Polish
- [x] Add Framer Motion **page transition** (`AnimatePresence` + fade slide) — shipped early in 1.3
- [ ] Add **scroll-triggered** fade-up animations to all section headings using `useInView`
- [ ] Add **hero particle/dot animation** (lightweight CSS keyframe floating dots — no heavy canvas library)
- [ ] Add **typewriter effect** to hero subtitle (custom hook)
- [ ] Add **hover glow** (cyan `box-shadow`) to all project cards and buttons (base styles in UI kit)
- [x] Add **navbar scroll behavior**: transparent → dark + blur on scroll (Framer Motion `useScroll`) — shipped early in 1.3
- [x] Add **skills ticker** smooth infinite loop (pure CSS animation keyframes ready in `tailwind.config.ts`)
- [x] All animations have `prefers-reduced-motion` fallback (global CSS + `useReducedMotion` in components)
- [ ] Review every page — confirm animations feel smooth, not excessive

### Module 3.2 — SEO & Metadata
- [x] Global metadata in `app/layout.tsx`: title template `"%s | Alex Carter — AI Engineer"`, description, keywords, authors, robots (OG image added in 3.2)
- [ ] Add Open Graph tags to all pages (title, description, image, url, type)
- [ ] Add Twitter Card meta tags to all pages
- [ ] Create `app/sitemap.ts` — auto-generates XML sitemap including all project + blog slugs from Sanity
- [ ] Create `app/robots.ts` — allows all crawlers, points to sitemap
- [ ] Add favicon: `/app/favicon.ico` (done) + `/public/og-image.png` (1200×630, dark themed)
- [ ] Test OG tags using opengraph.xyz

### Module 3.3 — Accessibility Audit
- [ ] All headings in correct semantic order (h1 → h2 → h3, never skip)
- [ ] All images have meaningful alt text (decorative images use `alt=""`)
- [ ] All interactive elements reachable and operable by keyboard only
- [x] Visible focus ring on all interactive elements (cyan outline via `:focus-visible` in globals)
- [ ] Color contrast passes WCAG AA (4.5:1 body, 3:1 large) — test with browser devtools
  - Note: small muted/purple text uses AA-safe shades (`muted-light #A1A1AA`, `purple-light #A78BFA`)
- [ ] No content is conveyed by color alone (status badges include text label too)
- [x] All form inputs will have associated `<label>` elements (built into Module 2.7)
- [x] Navbar mobile menu has proper `aria-expanded` and `aria-label`

### Module 3.4 — Performance Audit
- [ ] All images converted to .webp format and optimized
- [x] Next.js `<Image>` used everywhere with correct width, height, priority on hero image
- [x] Below-the-fold images use `loading="lazy"` (default for Next.js Image)
- [ ] No unused dependencies — run `npm ls` and remove anything not needed
- [x] Sanity queries use projections (only fetch fields you need)
- [x] Enable Incremental Static Regeneration (ISR) on project + blog fetches: `revalidate = 60`
- [ ] Run Lighthouse audit on: Home (mobile + desktop), a project page, a blog post page
- [ ] Achieve targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95
- [ ] Fix any Lighthouse issues before launch

### Module 3.5 — Final QA Checklist
- [ ] Test every page on mobile (375px) — no horizontal scroll, no overflow issues
- [ ] Test every page on tablet (768px) and desktop (1280px)
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test all navigation links — no broken links
- [ ] Test contact form — confirm email arrives
- [ ] Test Sanity admin at /admin — add a project, confirm it appears on /projects
- [ ] Test Sanity admin — add a blog post, confirm it appears on /blog
- [ ] Test resume download button — confirm PDF downloads
- [ ] Test GitHub + LinkedIn links — open in new tab
- [ ] Confirm Vercel deploy is live and all env vars are set
- [ ] Confirm no console errors on any page in production

### Module 3.6 — Launch
- [ ] Final push to GitHub → Vercel auto-deploys
- [ ] Verify live URL works end-to-end
- [ ] Submit sitemap to Google Search Console (free)
- [ ] Add portfolio URL to: LinkedIn profile, GitHub profile README, resume PDF, email signature
- [ ] Share on LinkedIn with a post about what you built 🎉

---

## 📊 Completion Tracker

| Part | Modules | Status |
|---|---|---|
| Part 1 — Foundation | 1.1 · 1.2 · 1.3 | ✅ (code complete — owner tasks: create Sanity project, connect Vercel) |
| Part 2 — Pages | 2.1 · 2.2 · 2.3 · 2.4 · 2.5 · 2.6 · 2.7 | ⬜ |
| Part 3 — Polish & Launch | 3.1 · 3.2 · 3.3 · 3.4 · 3.5 · 3.6 | ⬜ |
