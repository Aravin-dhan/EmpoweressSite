"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ReadingProgress({ target }: { target: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(target);
    if (!article) return;

    const handleScroll = () => {
      const height = Math.max(1, article.scrollHeight - window.innerHeight);
      const scrolled = window.scrollY - (article.offsetTop ?? 0);
      const percentage = Math.min(100, Math.max(0, (scrolled / height) * 100));
      setProgress(Number.isNaN(percentage) ? 0 : percentage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [target]);

  return (
    <div className="reading-progress fixed inset-x-0 top-0 z-40 h-1 bg-transparent print:hidden">
      <div
        className={cn(
          "h-full origin-left bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent transition-[width]",
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
