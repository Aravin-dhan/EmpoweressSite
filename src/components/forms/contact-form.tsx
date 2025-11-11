"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Unable to send your message right now.");
      }

      setStatus("sent");
      event.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Unable to send your message.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="name" placeholder="Full name" required disabled={status === "sending"} />
        <Input name="organization" placeholder="Organization" disabled={status === "sending"} />
      </div>
      <Input
        type="email"
        name="email"
        placeholder="Email address"
        required
        disabled={status === "sending"}
      />
      <Textarea
        name="message"
        rows={5}
        placeholder="Tell us about your research question or collaboration idea."
        required
        disabled={status === "sending"}
      />
      <label className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="text-brand-primary underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-primary underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      <Button type="submit" disabled={status === "sending" || !consent} className="w-full md:w-auto">
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>
      {status === "sent" && (
        <p className="text-sm text-green-600">Thanks! We will be in touch shortly.</p>
      )}
      {status === "error" && error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </form>
  );
}
