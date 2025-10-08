import { FaMinus, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { formatDateTime } from "../../utils/formatDate";
import type { FlightOffer } from "../../interfaces/ConfirmedFlightOffer";
import { getCityName } from "../../utils/getCityName";
import { getTotalDuration } from "../../utils/getTotalDuration";

interface ItineraryHeaderProps {
  flight: FlightOffer;
}

export default function ItineraryHeader({ flight }: ItineraryHeaderProps) {
  const firstItinerary = flight.itineraries[0];
  const lastItinerary = flight.itineraries[flight.itineraries.length - 1];

  const firstSegment = firstItinerary.segments[0];
  const destSegment =
    firstItinerary.segments[firstItinerary.segments.length - 1];
  const lastSegment = lastItinerary.segments[lastItinerary.segments.length - 1];

  const fromCityCode = firstSegment.departure.iataCode;
  const fromCityName = getCityName(fromCityCode);
  const toCityCode = destSegment.arrival.iataCode;
  const toCityName = getCityName(toCityCode);

  const startDate = formatDateTime(firstSegment.departure.at);
  const endDate = formatDateTime(lastSegment.arrival.at);

  // Count stops in first itinerary
  const stops =
    firstItinerary.segments.length -
    1 +
    (flight.itineraries.length > 1 ? lastItinerary.segments.length - 1 : 0);

  const passengerCount = flight.travelerPricings.length;
  const price = flight.price.total;
  const currency = flight.price.currency;

  return (
    <div className="mb-6 text-white bg-gradient-to-b from-blue-500 via-blue-700 to-blue-900 p-8 rounded-3xl shadow-md">
      {/* Navigation and Share Icons */}
      <div className="flex justify-between items-center">
        <Link to="/flights/results" aria-label="Back to Results">
          <FaArrowLeftLong size={24} />
        </Link>
        <button type="button">
          <FaShareAlt size={24} />
        </button>
      </div>

      {/* Flight Route and Details */}
      <div className="mt-4 text-center mx-auto">
        <div className="mt-6 flex justify-center gap-2 items-center">
          <p>
            <span className="font-bold">{fromCityName}</span> ({fromCityCode})
          </p>
          <FaMinus />
          <p>
            <span className="font-bold">{toCityName}</span> ({toCityCode})
          </p>
        </div>

        <p>
          {startDate.date} - {endDate.date} • {passengerCount}{" "}
          {passengerCount > 1 ? "passengers" : "passenger"}
        </p>
        <p>
          {getTotalDuration(flight.itineraries)} •{" "}
          {stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`}
        </p>

        <p className="mt-3 text-2xl font-medium text-yellow-400">
          {currency}
          {price}
        </p>

        {/* Book Now Button */}

        <Link
          to={`/flight/booking/${flight.id}`}
          role="button"
          aria-label={`Book flight from ${fromCityName} to ${toCityName}`}
          className="mt-6 w-full max-w-xs px-2 py-3 block mx-auto font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
