import { useEffect, useState } from "react";
import type { FlightOffer } from "../../interfaces/ConfirmedFlightOffer";
import ItineraryHeader from "../../components/flight/ItineraryHeader";
import FlightItineraryDetails from "../../components/flight/ItineraryDetails";
import { getAirlineName } from "../../utils/getAirlineName";
import ItineraryFareDetails from "../../components/flight/ItineraryFareDetails";

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

  const cabin = new Set(
    flight[0].travelerPricings.flatMap((t) =>
      t.fareDetailsBySegment.map((seg) => seg.cabin)
    )
  );

  return (
    <div className="max-w-7xl container mx-auto p-6">
      <ItineraryHeader flight={flight[0]} />

      <div className="mx-8 my-16 lg:grid lg:grid-cols-2 gap-12">
        <FlightItineraryDetails
          itineraries={flight[0].itineraries}
          airlineName={flight[0].validatingAirlineCodes.map((airline) =>
            getAirlineName(airline)
          )}
          cabin={[...cabin].join(", ")}
        />

        <ItineraryFareDetails travelerPricings={flight[0].travelerPricings} />
      </div>
    </div>
  );
}
