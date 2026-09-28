#!/usr/bin/env node
/**
 * Seed the Sanity dataset with 2 demo projects + 1 demo blog post.
 *
 * Usage:
 *   1. Create a Sanity project and set NEXT_PUBLIC_SANITY_PROJECT_ID /
 *      NEXT_PUBLIC_SANITY_DATASET in .env.local (see docs/SETUP-CHECKLIST.md)
 *   2. Create an API token at https://sanity.io/manage (read/write on the dataset)
 *   3. node scripts/seed.mjs --token=your-token
 *
 * The script is idempotent — re-running it overwrites the same seed documents.
 */
import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

/* Minimal .env.local loader (no extra dependency) */
function loadEnv(file) {
  if (!existsSync(file)) return {};
  const vars = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match) vars[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return vars;
}

const env = loadEnv(new URL("../.env.local", import.meta.url));
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

if (!projectId || projectId.toLowerCase().includes("replace")) {
  console.error(
    "✖ No Sanity Project ID found. Create a project at sanity.io and set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local first."
  );
  process.exit(1);
}

const tokenArg = process.argv.find((a) => a.startsWith("--token="));
const token = tokenArg ? tokenArg.split("=")[1] : process.env.SANITY_TOKEN;
if (!token) {
  console.error("✖ Missing token. Run: node scripts/seed.mjs --token=your-token");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

/* Portable-text helpers */
let keyCounter = 0;
const k = () => `k${++keyCounter}`;
const text = (t, style = "normal") => ({
  _type: "block",
  _key: k(),
  style,
  markSpans: [],
  children: [{ _key: k(), _type: "span", markDefs: [], text: t }],
});
const h2 = (t) => text(t, "h2");
const code = (language, c) => ({ _type: "codeBlock", _key: k(), language, code: c });

const docs = [
  {
    _id: "seed-project-support-copilot",
    _type: "project",
    title: "Support Copilot",
    slug: { _type: "slug", current: "support-copilot" },
    description:
      "An autonomous customer-support agent that resolves most tickets end-to-end using RAG over help-center docs.",
    longDescription: [
      h2("The Problem"),
      text(
        "Small e-commerce teams drown in repetitive support tickets. Owners lose hours a day answering the same questions, and response times slip past the point where customers churn."
      ),
      h2("Your Role"),
      text(
        "Solo builder — I designed, built, and deployed the full agent pipeline: retrieval, response generation, escalation logic, and the admin dashboard."
      ),
      h2("Approach / Process"),
      text(
        "I built a hybrid retrieval strategy (vector + keyword) over the help center, wrapped it in a tool-calling agent, and added a confidence gate that escalates low-confidence answers to a human."
      ),
      code(
        "python",
        "agent = create_agent(\n    model=\"gpt-4o-mini\",\n    tools=[search_docs, order_lookup, refund_policy],\n    guardrails=[escalate_if_confidence_below(0.7)],\n)"
      ),
      text(
        "I evaluated on a 200-ticket test set, iterating on chunking strategy until end-to-end resolution crossed 70%."
      ),
      h2("Results / Outcome"),
      text(
        "70% of tickets resolved end-to-end without a human, median first-response time cut from 6 hours to 4 minutes for the pilot store."
      ),
    ],
    techStack: ["Python", "LangChain", "OpenAI API", "FastAPI", "Pinecone"],
    role: "Solo builder — design, build, deploy",
    status: "live",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-github-username/support-copilot",
    featured: true,
    publishedAt: "2026-08-15T12:00:00Z",
  },
  {
    _id: "seed-project-ledger-lens",
    _type: "project",
    title: "Ledger Lens",
    slug: { _type: "slug", current: "ledger-lens" },
    description:
      "A document-understanding agent that parses invoices, extracts line items, and posts them to accounting tools.",
    longDescription: [
      h2("The Problem"),
      text(
        "Freelance bookkeepers manually key invoice data into spreadsheets. It's slow, error-prone, and scales badly when a client sends 500 PDFs at month end."
      ),
      h2("Your Role"),
      text(
        "Solo builder — I architected the multi-agent pipeline (extract → validate → post) and the webhook API that feeds it."
      ),
      h2("Approach / Process"),
      text(
        "A vision model extracts structured fields, a validator agent cross-checks totals, and a posting agent pushes entries to the accounting API with idempotency keys."
      ),
      code(
        "python",
        "pipeline = Crew(\n    agents=[extractor, validator, poster],\n    tasks=[parse_invoice, check_totals, post_entry],\n    process=Process.sequential,\n)"
      ),
      text(
        "Currently wiring the QuickBooks + Xero adapters and building a review queue for low-confidence extractions."
      ),
      h2("Results / Outcome"),
      text(
        "Field-level extraction accuracy of 96% on a 300-invoice benchmark set. In progress — launch planned with the first two pilot bookkeeping clients."
      ),
    ],
    techStack: ["Python", "CrewAI", "OpenAI API", "Next.js", "Tailwind"],
    role: "Solo builder — architecture + implementation",
    status: "in-progress",
    githubUrl: "https://github.com/your-github-username/ledger-lens",
    featured: true,
    publishedAt: "2026-09-01T12:00:00Z",
  },
  {
    _id: "seed-blog-research-agent",
    _type: "blogPost",
    title: "How I Built a Multi-Step Research Agent (and what broke)",
    slug: { _type: "slug", current: "multi-step-research-agent" },
    excerpt:
      "Planner → researcher → writer, with a verifier in the loop. Practical lessons on tool design, context budgets, and why your agent needs a critic.",
    body: [
      text(
        "Most demo agents answer in one shot. Real research work — “summarize the state of X, find gaps, draft a report” — needs a plan, parallel subtasks, and someone checking the work. This is the architecture I landed on after a few failures."
      ),
      h2("The architecture"),
      text(
        "Three roles: a planner that breaks the question into subtasks, a pool of researchers that execute them with search + read tools, and a writer that synthesizes with citations. A verifier agent scores the draft and sends it back for targeted re-research when confidence is low."
      ),
      code(
        "python",
        "class ResearchCrew:\n    def run(self, question):\n        plan = self.planner.plan(question)\n        findings = [self.research(t) for t in plan.subtasks]\n        draft = self.writer.synthesize(plan, findings)\n        return self.verify_or_revise(draft, plan)\n"
      ),
      h2("What broke"),
      text(
        "Context blowup first — every researcher was copying the full plan, so token bills 4x'd. The fix: each researcher only sees its own subtask plus a compressed summary of the others' findings."
      ),
      text(
        "Second: silent hallucination in the writer. The verifier with a strict citation check caught roughly a fifth of unsupported claims in my test set. The critic is the most important component in the system — budget for it."
      ),
      h2("Takeaways"),
      text(
        "Design tools before prompts. Compress context aggressively. Always ship a verifier, even a dumb one. And evaluate on 50 real questions, not 3 demo questions."
      ),
    ],
    tags: ["agents", "langgraph", "tutorials"],
    publishedAt: "2026-09-10T12:00:00Z",
  },
];

try {
  await client.write(docs, { dryRun: false });
  console.log("✔ Seeded 2 projects + 1 blog post into dataset: " + dataset);
  console.log("  → open /admin on your site to review them");
} catch (error) {
  console.error("✖ Seeding failed:", error.message ?? error);
  process.exit(1);
}
