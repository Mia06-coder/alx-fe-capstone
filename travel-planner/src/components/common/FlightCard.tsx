import type { FlightOffer } from "../../interfaces/FlightOffer";
import { formatDateTime } from "../../utils/formatDate";
import { formatStops } from "../../utils/formatStops";
import { getCabinAndBags } from "../../utils/getCabinAndBags";
import flightLogo from "../../assets/images/flights/flight2.jpg";

export default function FlightCard(flight: FlightOffer) {
  return (
    <div className="p-4 border border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-slate-100 via-sky-50 to-sky-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-md">
      <p className="text-right italic text-xs text-red-400">
        Only {flight.numberOfBookableSeats} seats left at this price!!!
      </p>

      {/* Flight summary */}
      <div className="my-3 flex justify-between text-sm">
        <div className="flex gap-2 items-center">
          <img
            src={flightLogo}
            alt="logo"
            className="w-7 h-7 rounded-full bg-rose-100 object-cover"
          />
          <p className="font-bold">
            {flight.validatingAirlineCodes.join(", ")}{" "}
          </p>
        </div>
        <p>
          <span className="font-semibold">
            {flight.itineraries[0].duration.replace("PT", "").toLowerCase()}
          </span>{" "}
          <span className="text-[var(--color-text-secondary)]">
            ({formatStops(flight.itineraries[0].segments)})
          </span>
        </p>
      </div>

      {/* Flight details */}
      <div className="min-[480px]:flex justify-between gap-12 text-sm p-3 border-t border-[var(--color-border)]">
        <div className="flex gap-2 items-center w-full max-w-md">
          {/* Origin */}
          <div className="flex flex-col items-center">
            <span className="font-bold">
              {flight.itineraries[0].segments[0].departure.iataCode}
            </span>
            <span>
              {
                formatDateTime(flight.itineraries[0].segments[0].departure.at)
                  .date
              }
            </span>
            <span className="font-semibold">
              {
                formatDateTime(flight.itineraries[0].segments[0].departure.at)
                  .time
              }
            </span>
          </div>

          <div className="flex-1 border-t border-dashed border-[var(--color-placeholder)] mx-2"></div>

          {/* Destination */}
          <div className="flex flex-col items-center">
            <span className="font-bold">
              {
                flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ].arrival.iataCode
              }
            </span>
            <span>
              {
                formatDateTime(
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.at
                ).date
              }
            </span>
            <span className="font-semibold">
              {
                formatDateTime(
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.at
                ).time
              }
            </span>
          </div>
        </div>

        {/* Price info */}
        <div className="flex justify-evenly min-[480px]:flex-col min-[480px]:justify-center items-center text-[var(--color-text-secondary)]">
          <span className="text-xl font-bold text-[var(--color-accent)]">
            {flight.price.currency}
            {flight.price.total}
          </span>
          <span className="text-xs font-medium">
            {getCabinAndBags(flight).cabin}
          </span>
          <span>{getCabinAndBags(flight).bags}</span>
        </div>
      </div>
    </div>
  );
}
