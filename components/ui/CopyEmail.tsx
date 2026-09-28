"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

/** Copy email to clipboard with visual feedback (Module 2.7). */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — mailto still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy email address ${siteConfig.email}`}
      className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-cyan/50 hover:text-cyan"
    >
      {copied ? (
        <Check size={13} className="text-green" aria-hidden="true" />
      ) : (
        <Copy size={13} aria-hidden="true" />
      )}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
