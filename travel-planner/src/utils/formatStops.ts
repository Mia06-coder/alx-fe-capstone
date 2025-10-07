import type { Segment } from "../interfaces/FlightOffer";

/**
 *
 * @param segments Array of flight segments
 * @returns Formatted string indicating number of stops, e.g. "1 stop" or "2 stops"
 * Handles pluralization correctly.
 * Examples:
 * - 1 segment (non-stop): "non-stop"
 * - 2 segments (1 stop): "1 stop"
 * - 3 segments (2 stops): "2 stops"
 * - 4 segments (3 stops): "3 stops"
 * - etc.
 */

export function formatStops(segments: Segment[]): string {
  const stops = segments.length - 1;
  return stops === 0 ? "non-stop" : stops === 1 ? "1 stop" : `${stops} stops`;
}
