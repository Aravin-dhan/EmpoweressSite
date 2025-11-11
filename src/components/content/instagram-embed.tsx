"use client";

import { useEffect } from "react";

type InstagramEmbedProps = {
  url: string;
  caption?: string;
};

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

export function InstagramEmbed({ url, caption }: InstagramEmbedProps) {
  useEffect(() => {
    if (!window.instgrm) return;
    window.instgrm.Embeds?.process?.();
  }, [url]);

  if (!url) return null;

  return (
    <div className="my-6">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      >
        <a href={url}>{caption ?? "View on Instagram"}</a>
      </blockquote>
      <script async src="//www.instagram.com/embed.js" />
    </div>
  );
}
