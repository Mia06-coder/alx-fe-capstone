import type { FlightOffer } from "../interfaces/FlightOffer";
import type { FlightOfferParams } from "../interfaces/FlightOffersParams";

export interface FlightContextType {
  flights: FlightOffer[];
  loading: boolean;
  error: string | null;
  fetchFlights: (params: FlightOfferParams) => Promise<void>;
}
