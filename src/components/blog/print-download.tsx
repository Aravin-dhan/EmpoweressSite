"use client";

import { PrinterIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export function PrintDownload() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 print:hidden">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
        Save
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Prefer a PDF copy? Download the post with a printer-friendly layout.
      </p>
      <Button
        onClick={handlePrint}
        variant="secondary"
        className="mt-4 inline-flex items-center gap-2"
      >
        <PrinterIcon className="h-4 w-4" aria-hidden="true" />
        Download PDF
      </Button>
    </section>
  );
}
