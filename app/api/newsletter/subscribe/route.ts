import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: { email?: string; firstName?: string; topics?: string[]; source?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Newsletter delivery is not connected yet. Add NEWSLETTER_WEBHOOK_URL in Vercel to activate subscriptions." },
      { status: 503 },
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      firstName: payload.firstName?.trim() || "",
      topics: Array.isArray(payload.topics) ? payload.topics : [],
      source: payload.source || "metaphor-website",
      subscribedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "The newsletter provider rejected the subscription." }, { status: 502 });
  }

  return NextResponse.json({ message: "You’re on the list. Check your inbox for confirmation." });
}
