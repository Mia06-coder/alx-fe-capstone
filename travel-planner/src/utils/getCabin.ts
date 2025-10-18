// src/utils/getCabin.ts
import type { FlightOffer } from "../interfaces/FlightOffer";

/**
 * Extracts cabin class from a flight offer.
 * Returns a consistent summary, e.g. { cabin: "Economy" }.
 */
export function getCabin(flight: FlightOffer): {
  cabin: string;
} {
  if (
    !flight.travelerPricings?.length ||
    !flight.travelerPricings[0].fareDetailsBySegment?.length
  ) {
    return { cabin: "Unknown" };
  }

  const fareDetails = flight.travelerPricings[0].fareDetailsBySegment;

  // Extract all cabins and weights
  const cabins = fareDetails.map((seg) => seg.cabin);

  // Remove duplicate cabin classes
  const uniqueCabins = [...new Set(cabins)];

  // Format cabin display
  const cabinDisplay = uniqueCabins.join(" / ");

  return {
    cabin: cabinDisplay,
  };
}
