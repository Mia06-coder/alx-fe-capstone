import { FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { formatDateTime } from "../../utils/formatDate";
import type { FlightOffer } from "../../interfaces/ConfirmedFlightOffer";
import { getCityName } from "../../utils/getCityName";
import { getTotalDuration } from "../../utils/getTotalDuration";

interface BookingHeaderProps {
  flight: FlightOffer;
}

export default function BookingHeader({ flight }: BookingHeaderProps) {
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
    <div className="mb-6 text-white bg-gradient-to-b from-blue-500 via-blue-700 to-blue-900 p-8 rounded-3xl shadow-md h-max md:top-4 sticky md:flex-1/3">
      {/* Navigation and Share Icons */}
      <div className="flex justify-between items-center">
        <Link
          to={`/flight/itinerary/${flight.id}`}
          aria-label="Back to Results"
        >
          <FaArrowLeftLong size={24} />
        </Link>
        <button type="button">
          <FaShareAlt size={24} />
        </button>
      </div>

      {/* Flight Route and Details */}
      <div className="mt-15 flex flex-col space-y-3 mx-auto text-center md:text-left">
        <p className="font-medium">
          ORIGIN:{" "}
          <span className="font-normal">
            {fromCityName} ({fromCityCode})
          </span>
        </p>
        <p>
          <span className="font-medium">DESTINATION: </span>
          {toCityName} ({toCityCode})
        </p>
        <p className="mt-5">
          <span className="font-medium">DATES: </span>
          {startDate.date} - {endDate.date}
        </p>
        <p>
          <span className="font-medium">Passenger(s): </span>
          {passengerCount}
        </p>
        <p>
          <span className="font-medium">Duration: </span>
          {getTotalDuration(flight.itineraries)}
        </p>
        <p>
          <span className="font-medium">Stops: </span>
          {stops}
        </p>
        <p className="mt-3 text-2xl font-medium text-yellow-400 text-center">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
}
