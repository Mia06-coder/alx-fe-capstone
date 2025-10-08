export function parseDuration(durationStr: string) {
  const hours = parseInt(durationStr.match(/(\d+)H/)?.[1] || "0", 10);
  const minutes = parseInt(durationStr.match(/(\d+)M/)?.[1] || "0", 10);
  return hours * 60 + minutes;
}
