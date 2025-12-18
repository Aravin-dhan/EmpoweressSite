"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "back-to-top fixed bottom-8 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-1",
      )}
      aria-label="Back to top"
    >
      <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
      Top
    </button>
  );
}
