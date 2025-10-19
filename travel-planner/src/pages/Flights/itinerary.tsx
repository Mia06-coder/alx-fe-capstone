// src/pages/Flights/itinerary.tsx
import { useEffect, useState } from "react";
import ItineraryHeader from "../../components/flight/ItineraryHeader";
import FlightItineraryDetails from "../../components/flight/ItineraryDetails";
import { getAirlineName } from "../../utils/getAirlineName";
import ItineraryFareDetails from "../../components/flight/ItineraryFareDetails";
import { useLocation } from "react-router-dom";
import type { ConfirmedFlightOfferData } from "../../interfaces/ConfirmedFlightOffer";
import type { FlightOffer } from "../../interfaces/FlightOffer";
import { getConfirmedFlight } from "../../api/flightConfirmation";
import LoadingFlightItinerary from "../../components/flight/LoadingFlightItinerary";

export default function FlightItinerary() {
  const { state } = useLocation();
  const [flightData, setFlightData] = useState<ConfirmedFlightOfferData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const flight: FlightOffer = state?.flight;

  useEffect(() => {
    if (!flight) return;
    const fetchFlightDetails = async () => {
      try {
        const data = await getConfirmedFlight(flight);
        console.log(`Flight Details: ${data}`);
        setFlightData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch pricing.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFlightDetails();
  }, [flight]);

  if (loading) {
    return <LoadingFlightItinerary />;
  }

  if (error) {
    return <div className="container p-6">Error: {error}</div>;
  }

  if (!flightData) {
    return <div>No flight</div>;
  }

  const cabin = new Set(
    flightData.flightOffers[0].travelerPricings.flatMap((t) =>
      t.fareDetailsBySegment.map((seg) => seg.cabin)
    )
  );

  return (
    <div className="max-w-7xl container mx-auto p-6">
      <ItineraryHeader flight={flightData.flightOffers[0]} />

      <div className="mx-8 my-16 lg:grid lg:grid-cols-2 gap-12">
        <FlightItineraryDetails
          itineraries={flightData.flightOffers[0].itineraries}
          airlineName={flightData.flightOffers[0].validatingAirlineCodes.map(
            (airline) => getAirlineName(airline)
          )}
          cabin={[...cabin].join(", ")}
        />

        <ItineraryFareDetails
          travelerPricings={flightData.flightOffers[0].travelerPricings}
        />
      </div>
    </div>
  );
}
