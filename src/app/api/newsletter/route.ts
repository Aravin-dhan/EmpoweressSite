import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({}));

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email address is required." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhookUrl) {
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

    return NextResponse.json({ success: true, queued: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const contactInbox = process.env.CONTACT_INBOX ?? siteConfig.contactEmail;

  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Empoweress Newsletter <${contactInbox}>`,
        to: contactInbox,
        subject: "New newsletter subscriber",
        html: `<p>${email} just subscribed to Empoweress Dispatch.</p>`,
      }),
    });

    if (!response.ok) {
      const payload = await response.text();
      console.error("[newsletter] Failed to email subscription", payload);
      return NextResponse.json(
        { error: "Unable to subscribe right now. Please try again soon." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, delivered: true });
  }

  console.info("[newsletter] No webhook or email configured. Logging signup locally.");
  console.info({ email });
  return NextResponse.json({ success: true, queued: false });
}
