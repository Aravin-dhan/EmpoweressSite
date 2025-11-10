import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({}));

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email address is required." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info("[newsletter] Missing NEWSLETTER_WEBHOOK_URL. Simulating success.");
    return NextResponse.json({ success: true, queued: false });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const payload = await response.text();
    console.error("[newsletter] Failed to forward subscription", payload);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again soon." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
