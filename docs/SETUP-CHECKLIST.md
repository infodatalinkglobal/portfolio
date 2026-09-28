# Setup Checklist — Sanity, Formspree, Vercel

Everything the site needs from your accounts. Do these in any order; the site
runs fine without them (empty states) and activates as soon as each value is set.

## 1. Sanity CMS

- [x] Project created: **`ej5ob7dg`** (dataset `production` — exists, currently empty)
- [x] Wired into `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID=ej5ob7dg`)

1. Open **`/admin`** in the preview → sign in with
   your Sanity account. You should see the Studio with the **Projects** and
   **Blog Posts** sections.
5. **Seed content** — either:
   - one command (recommended): create an API token at
     https://sanity.io/manage (scopes: `dataset.write` + `dataset.read` for
     your dataset), then
     ```bash
     node scripts/seed.mjs --token=your-token
     ```
     This writes 2 demo projects + 1 demo blog post.
   - or manually: create 2 projects + 1 blog post in the Studio.
     For projects, use **H2 headings** in the case study for
     *The Problem / Your Role / Approach / Process / Results / Outcome*.
6. Verify: `/projects` shows both projects, `/blog` shows the post.

> **Note on the build sandbox:** this workspace has no route to
> `api.sanity.io`, so the *pages* here render their empty states even once
> content exists (fetches fall back gracefully). `/admin` works fully —
> Studio talks to Sanity from **your browser** — so create/seed content there,
> and the pages light up on the Vercel deploy (ISR picks changes up within 60 s).

## 2. Formspree (~2 min)

1. Sign up (free) at **https://formspree.io** → create a form.
2. Set the **recipient** to your real email address.
3. Copy the endpoint (looks like `https://formspree.io/f/abcd1234`).
4. Put it in **`.env.local`**:
   ```
   FORMSPREE_ENDPOINT=https://formspree.io/f/abcd1234
   ```
5. Verify: submit the contact form → check your inbox (check spam on first send).

## 3. Vercel deploy (~5 min)

1. Push this branch (or merge it to `main`).
2. In Vercel: **Add New → Project** → import the `infodatalinkglobal/portfolio` repo.
   Framework preset: **Next.js** (auto-detected).
3. Add environment variables (Settings → Environment Variables) for
   **Production** (and Preview if you like) — values ready to paste:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ej5ob7dg
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   FORMSPREE_ENDPOINT=<your form endpoint>
   ```
4. Deploy → open the live URL:
   - `/` renders, `/projects` + `/blog` pull from Sanity,
   - `/admin` Studio loads (sign in),
   - contact form sends mail.
5. Update `siteConfig.url` in **`lib/site.ts`** to your real Vercel URL
   (used for OG tags + sitemap) and re-deploy.

## 4. Swap placeholder identity (~5 min)

In **`lib/site.ts`** replace:
- `name`, `email` — your real name + email
- `github`, `linkedin` — your profile URLs
- `school`, `degree` — real school/degree (About page, Part 2)
- `url` — your Vercel URL

Then re-deploy.

## 5. After launch (Part 3)

- Submit the sitemap (`/sitemap.xml`) to Google Search Console.
- Add the portfolio URL to your LinkedIn profile, GitHub README, and resume.
