import { NextResponse } from "next/server";

/**
 * Contact form relay (Module 2.7).
 * Keeps the Formspree endpoint server-side (no NEXT_PUBLIC_ var needed) and
 * gives the client a clean JSON contract.
 */
export async function POST(request: Request) {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint || endpoint.includes("replace")) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured yet. Set FORMSPREE_ENDPOINT in your environment (docs/SETUP-CHECKLIST.md).",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as {
    name?: string;
    email?: string;
    message?: string;
  };
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `New portfolio message from ${name}`,
      }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as {
        errors?: Array<{ message?: string }>;
      } | null;
      const detail = data?.errors?.length
        ? data.errors.map((e) => e.message).join(" ")
        : res.statusText;
      return NextResponse.json(
        { error: `Formspree error: ${detail}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Formspree. Please try again later." },
      { status: 502 }
    );
  }
}
