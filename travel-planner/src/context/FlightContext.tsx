// src/context/FlightContext.tsx
import { createContext, useState, type ReactNode } from "react";
import { getFlightOffers } from "../api/flightOffers";
import type { FlightOffer } from "../interfaces/FlightOffer";
import type { FlightOfferParams } from "../interfaces/FlightOffersParams";
import type { FlightContextType } from "../interfaces/FlightContextType";

const FlightContext = createContext<FlightContextType | undefined>(undefined);
export default FlightContext;

export function FlightProvider({ children }: { children: ReactNode }) {
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<FlightOfferParams | null>(
    null
  );

  // Core logic: handles flight fetching globally
  const fetchFlights = async (params: FlightOfferParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFlightOffers(params);
      setSearchParams(params);
      setFlights(data.data || []);
      console.log("Fetched flights:", data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch flights");
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlightContext.Provider
      value={{
        flights,
        loading,
        error,
        fetchFlights,
        searchParams,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}
