import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-40 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
        404
      </p>
      <h1 className="font-serif text-4xl">We couldn’t find that page.</h1>
      <p className="max-w-xl text-[var(--color-muted)]">
        The argument you’re looking for may still be in drafts. Try searching the archive or head back to the homepage.
      </p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}
