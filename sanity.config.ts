import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "AI Engineer Portfolio",
  // Read from env so the same config works in .env.local and on Vercel.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
