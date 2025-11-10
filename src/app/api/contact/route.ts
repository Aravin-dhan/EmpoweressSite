import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

const buildHtml = (payload: Record<string, string>) => `
  <h1>New Empoweress contact</h1>
  <ul>
    ${Object.entries(payload)
      .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
      .join("")}
  </ul>
`;

export async function POST(request: Request) {
  const data = await request.json().catch(() => ({}));
  const { name, email, organization = "", message } = data;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const contactInbox = process.env.CONTACT_INBOX ?? siteConfig.contactEmail;

  if (!resendKey) {
    console.info("[contact] Missing RESEND_API_KEY. Message stored locally.");
    console.info({ name, email, organization, message });
    return NextResponse.json({ success: true, queued: false });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: `Empoweress Contact <${contactInbox}>`,
      to: contactInbox,
      subject: `Contact form: ${name}`,
      reply_to: email,
      html: buildHtml({ name, email, organization, message }),
    }),
  });

  if (!response.ok) {
    const payload = await response.text();
    console.error("[contact] Failed to send email", payload);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
