import type { FlightOffer } from "../interfaces/FlightOffer";

/**
 * Extracts cabin class and checked baggage info from a flight offer.
 * Returns a consistent summary, e.g. { cabin: "Economy", bags: "25kg" }.
 */
export function getCabinAndBags(flight: FlightOffer): {
  cabin: string;
  bags: string;
} {
  if (
    !flight.travelerPricings?.length ||
    !flight.travelerPricings[0].fareDetailsBySegment?.length
  ) {
    return { cabin: "Unknown", bags: "N/A" };
  }

  const fareDetails = flight.travelerPricings[0].fareDetailsBySegment;

  // Extract all cabins and weights
  const cabins = fareDetails.map((seg) => seg.cabin);
  const weights = fareDetails.map(
    (seg) => seg.includedCheckedBags?.weight || 0
  );

  // Remove duplicate cabin classes
  const uniqueCabins = [...new Set(cabins)];

  // Pick max weight in case some legs differ
  const maxWeight = Math.max(...weights);

  // Format cabin display
  const cabinDisplay = uniqueCabins.join(" / ");

  return {
    cabin: cabinDisplay,
    bags: `${maxWeight}kg`,
  };
}
