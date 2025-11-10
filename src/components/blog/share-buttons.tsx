"use client";

import { useState } from "react";
import {
  ArrowUpOnSquareIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const platforms = [
  { name: "Twitter", baseUrl: "https://twitter.com/intent/tweet?text=" },
  { name: "LinkedIn", baseUrl: "https://www.linkedin.com/sharing/share-offsite/?url=" },
  { name: "WhatsApp", baseUrl: "https://api.whatsapp.com/send?text=" },
];

type ShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
};

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLink = (baseUrl: string) =>
    `${baseUrl}${encodedTitle}%20${encodedUrl}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
        Share
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={shareLink(platform.baseUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 px-4 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10"
          >
            <ArrowUpOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            {platform.name}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 px-4 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10"
        >
          <LinkIcon className="h-4 w-4" aria-hidden="true" />
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
