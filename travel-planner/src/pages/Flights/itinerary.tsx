import { useEffect, useState } from "react";
import type { FlightOffer } from "../../interfaces/ConfirmedFlightOffer";
import ItineraryHeader from "../../components/flight/ItineraryHeader";

export default function FlightItinerary() {
  const [flight, setFlight] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch flight data from a local JSON file
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("/confirmedflightoffers.json");
        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }
        const data = await response.json();
        setFlight(data.data.flightOffers);

        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  if (loading) {
    return <div className="container p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container p-6">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl container mx-auto p-6">
      <ItineraryHeader flight={flight[0]} />
    </div>
  );
}
