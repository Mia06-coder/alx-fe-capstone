import { FaMinus, FaShareAlt } from "react-icons/fa";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { formatDateTime } from "../../utils/formatDate";
import type { FlightOffer } from "../../interfaces/ConfirmedFlightOffer";
import { getCityName } from "../../utils/getCityName";

interface ItineraryHeaderProps {
  flight: FlightOffer;
}

export default function ItineraryHeader({ flight }: ItineraryHeaderProps) {
  // Helper to convert duration strings like "PT8H40M"
  function parseDuration(durationStr: string) {
    const hours = parseInt(durationStr.match(/(\d+)H/)?.[1] || "0", 10);
    const minutes = parseInt(durationStr.match(/(\d+)M/)?.[1] || "0", 10);
    return hours * 60 + minutes;
  }

  // Calculate total duration (all segments)
  const totalMinutes = flight.itineraries.reduce((total, itinerary) => {
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
  const totalDuration = `${hours}h ${minutes}m`;

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
    <div className="mb-6 text-white bg-gradient-to-b from-blue-500 via-blue-700 to-blue-900 p-4 rounded-3xl shadow-md">
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

      <div className="mt-4">
        <div className="mt-6 flex gap-2 items-center">
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
          {totalDuration} •{" "}
          {stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`}
        </p>

        <p className="mt-3 text-2xl font-medium text-yellow-400">
          {currency}
          {price}
        </p>

        {/* Book Now Button */}
        <Button
          label="Book Now"
          className="mt-6 w-full max-w-xs block mx-auto bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700"
          ariaLabel={`Book flight from ${fromCityName} to ${toCityName}`}
        />
      </div>
    </div>
  );
}
