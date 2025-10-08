// src/utils/formatDuration.ts

export function formatDuration(duration: string): string {
  // e.g. "PT8H40M" → "8h 40m"
  return duration.replace("PT", "").replace("H", "h ").replace("M", "m");
}
