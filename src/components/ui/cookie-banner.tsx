"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "empoweress-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = window.localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-glow sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2">
      <p className="text-sm text-[var(--color-foreground)]">
        We use essential cookies and privacy-friendly analytics to improve Empoweress.{" "}
        <Link href="/privacy" className="font-semibold text-brand-primary underline">
          Learn more
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button onClick={accept} className="px-4 py-1 text-sm">
          I consent
        </Button>
        <Link href="/privacy" className="text-sm font-semibold text-brand-primary underline">
          View policy
        </Link>
      </div>
    </div>
  );
}
