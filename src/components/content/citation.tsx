"use client";

type CitationProps = {
  id: string;
  href?: string;
  label?: string;
};

export function Citation({ id, href, label }: CitationProps) {
  const display = label ?? id;
  return (
    <sup className="text-brand-primary">
      <a href={href ?? `#${id}`} className="hover:underline">
        [{display}]
      </a>
    </sup>
  );
}
