// src/interfaces/FlightContextType.ts
import type { FlightOffer } from "./FlightOffer";
import type { FlightOfferParams } from "./FlightOffersParams";

export interface FlightContextType {
  flights: FlightOffer[];
  loading: boolean;
  error: string | null;
  fetchFlights: (params: FlightOfferParams) => Promise<void>;
  searchParams: FlightOfferParams | null;
}
