"use client";

import { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type ShareInlineButtonProps = {
  title: string;
  url: string;
  className?: string;
};

export function ShareInlineButton({ title, url, className }: ShareInlineButtonProps) {
  const [label, setLabel] = useState("Share");

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setLabel("Copied!");
        setTimeout(() => setLabel("Share"), 2000);
      }
    } catch {
      setLabel("Try again");
      setTimeout(() => setLabel("Share"), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary transition hover:bg-brand-primary/10",
        className,
      )}
      aria-label={`Share ${title}`}
    >
      <ShareIcon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
