import { formatDate } from "@/lib/utils";
import type { PostRecord } from "@/types/content";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

type PostMetaProps = Pick<PostRecord, "date" | "lastUpdated" | "readingTime"> & {
  showUpdated?: boolean;
};

export function PostMeta({
  date,
  lastUpdated,
  readingTime,
  showUpdated = false,
}: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
      <span className="inline-flex items-center gap-2">
        <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
        <span>{formatDate(date)}</span>
      </span>
      {showUpdated && lastUpdated && lastUpdated !== date && (
        <span className="text-xs italic">
          Updated {formatDate(lastUpdated)}
        </span>
      )}
      <span className="inline-flex items-center gap-2">
        <ClockIcon className="h-4 w-4" aria-hidden="true" />
        <span>{readingTime.text}</span>
      </span>
    </div>
  );
}
