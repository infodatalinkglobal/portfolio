"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Embedded Sanity Studio (spec: Module 1.2).
 * Client component on purpose — see app/admin/layout.tsx.
 */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
