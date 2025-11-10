import { cn } from "@/lib/utils";

type CategoryTagProps = {
  label: string;
  className?: string;
};

export function CategoryTag({ label, className }: CategoryTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        "border-[var(--color-tag-border)] bg-[var(--color-tag-bg)] text-[var(--color-tag-text)]",
        className,
      )}
    >
      {label}
    </span>
  );
}
