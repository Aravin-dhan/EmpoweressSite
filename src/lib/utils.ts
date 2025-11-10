import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(
  value: string | Date,
  pattern = "dd MMM yyyy",
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return format(date, pattern);
}

export function readingTimeLabel(minutes: number) {
  if (!minutes) return "Quick read";
  if (minutes <= 3) return "Quick read";
  if (minutes >= 15) return "Deep dive";
  return `${minutes} min read`;
}
