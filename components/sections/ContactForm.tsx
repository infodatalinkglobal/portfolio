"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const inputClasses =
  "w-full rounded-md border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-cyan/60 focus:outline-none focus:ring-1 focus:ring-cyan/40";

/**
 * Contact form → /api/contact → Formspree (Module 2.7).
 * Loading spinner, success state, error + retry, full validation.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const set = (field: keyof typeof values) => (value: string) =>
    setValues((v) => ({ ...v, [field]: value }));

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!values.name.trim()) errors.name = "Name is required.";
    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) {
      errors.message = "Message is required.";
    } else if (values.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }
    return errors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-green/40 bg-green/5 p-8 text-center"
      >
        <CheckCircle2 size={40} className="mx-auto text-green" aria-hidden="true" />
        <p className="mt-4 font-mono text-lg text-green">
          Message sent! I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", message: "" });
            setStatus("idle");
          }}
          className="mt-6 rounded-md border border-line px-4 py-2 font-mono text-xs text-foreground/80 transition-colors hover:border-cyan/50 hover:text-cyan"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "error" && error && (
        <div
          role="alert"
          className="rounded-md border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          {error} — please try again.
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="mb-2 block font-mono text-sm text-foreground">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={values.name}
          onChange={(e) => set("name")(e.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className={cn(inputClasses, fieldErrors.name && "border-red-400/60")}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="mt-2 text-sm text-red-300">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block font-mono text-sm text-foreground">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          className={cn(inputClasses, fieldErrors.email && "border-red-400/60")}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className="mt-2 text-sm text-red-300">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block font-mono text-sm text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, role, or idea…"
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className={cn(inputClasses, "resize-y", fieldErrors.message && "border-red-400/60")}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="mt-2 text-sm text-red-300">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan px-8 py-4 font-mono text-sm font-semibold text-background shadow-glow-cyan transition-all duration-300 hover:shadow-glow-cyan-lg sm:w-auto",
          status === "loading" && "pointer-events-none opacity-70"
        )}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
