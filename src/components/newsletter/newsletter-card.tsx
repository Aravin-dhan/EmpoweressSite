"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function NewsletterSignup({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    if (!email) return;

    try {
      setStatus("loading");
      setMessage(null);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? "Unable to subscribe right now.");
      }

      setStatus("success");
      setMessage("Welcome aboard! Check your inbox to confirm.");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className={cn(
        "rounded-3xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/10 via-surface-base to-brand-secondary/10 p-8 shadow-glow",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-brand-primary">
        Newsletter
      </p>
      <h3 className="mt-3 font-serif text-3xl font-semibold text-[var(--color-foreground)]">
        Empoweress Dispatch
      </h3>
      <p className="mt-2 text-[var(--color-muted)]">
        {siteConfig.newsletter.description}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-live="polite">
        <Input
          type="email"
          name="email"
          required
          placeholder="Email address"
          autoComplete="email"
          disabled={status === "loading"}
        />
        <Button type="submit" className="w-full md:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "Adding you..." : "Subscribe"}
        </Button>
        <p className="text-xs text-[var(--color-muted)]">
          By subscribing you agree to receive feminist research digests from
          Empoweress. Opt out anytime.
        </p>
        {status !== "idle" && message && (
          <p
            className={`text-sm font-medium ${
              status === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
