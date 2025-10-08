import { FaPlane } from "react-icons/fa";
import type { Segment } from "../../interfaces/ConfirmedFlightOffer";
import { formatDateTime } from "../../utils/formatDate";
import { formatDuration } from "../../utils/formatDuration";
import { getCityName } from "../../utils/getCityName";
import { getAirlineName } from "../../utils/getAirlineName";
import { getAirportName } from "../../utils/getAirportName";

interface SegmentProps {
  segment: Segment;
}

function ItineraryCard({ segment }: SegmentProps) {
  const departureDate = formatDateTime(segment.departure.at).date;
  const departureTime = formatDateTime(segment.departure.at).time;

  const arrivalDate = formatDateTime(segment.arrival.at).date;
  const arrivalTime = formatDateTime(segment.arrival.at).time;

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex justify-center gap-3 md:gap-8 bg-[var(--color-bg-solid)] border border-[var(--color-accent)] rounded-3xl p-4">
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold text-sm">{departureTime}</span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {departureDate}
          </span>
        </div>

        <span className="font-semibold text-xs">
          {formatDuration(segment.duration)}
        </span>

        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold text-sm">{arrivalTime}</span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {arrivalDate}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-1">
        {/* Departure dot */}
        <div className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full"></div>

        {/* Top connecting line */}
        <div className="w-px h-8 bg-[var(--color-placeholder)]"></div>

        {/* Plane icon */}
        <FaPlane
          size={12}
          className="text-[var(--color-text-muted)] transform rotate-90"
        />

        {/* Bottom connecting line */}
        <div className="w-px h-8 bg-[var(--color-placeholder)]"></div>

        {/* Arrival dot */}
        <div className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full"></div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-center items-start">
          <span className="font-semibold text-sm">
            {getCityName(segment.departure.iataCode)} •{" "}
            {segment.departure.iataCode}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {getAirportName(segment.departure.iataCode)}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {segment.departure.terminal
              ? `Terminal ${segment.departure.terminal}`
              : "---"}
          </span>
        </div>

        <div className="px-2 py-[2px] bg-[var(--color-accent)]/10 text-xs text-center rounded-full w-max">
          {segment.carrierCode}
          {segment.number} • {getAirlineName(segment.carrierCode)}
        </div>

        <div className="flex flex-col justify-center items-start">
          <span className="font-semibold text-sm">
            {getCityName(segment.arrival.iataCode)} • {segment.arrival.iataCode}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {getAirportName(segment.arrival.iataCode)}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {segment.arrival.terminal
              ? `Terminal ${segment.arrival.terminal}`
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCard;
