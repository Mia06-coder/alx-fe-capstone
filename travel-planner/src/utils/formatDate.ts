// src/utils/dateHelpers.ts

/**
 * Converts an ISO date string into separate formatted date and time.
 * @example
 * formatDateTime("2025-10-06T13:45:00")
 * // { date: "Oct 06", time: "13:45" }
 */
export function formatDateTime(isoString: string): {
  date: string;
  time: string;
} {
  if (!isoString) return { date: "", time: "" };

  const date = new Date(isoString);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    date: dateFormatter.format(date), // e.g. "Oct 06"
    time: timeFormatter.format(date), // e.g. "13:45"
  };
}
