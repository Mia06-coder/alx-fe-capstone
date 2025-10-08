import type { Itinerary } from "../interfaces/ConfirmedFlightOffer";
import { parseDuration } from "./parseDuration";

export function getTotalDuration(itineraries: Itinerary[]) {
  // Calculate total duration (all segments)
  const totalMinutes = itineraries.reduce((total, itinerary) => {
    return (
      total +
      itinerary.segments.reduce(
        (sum, seg) => sum + parseDuration(seg.duration),
        0
      )
    );
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}
