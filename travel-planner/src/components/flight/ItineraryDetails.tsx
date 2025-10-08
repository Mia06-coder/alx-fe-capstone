import { FaClock, FaStopCircle, FaChair, FaPlane } from "react-icons/fa";
import OverviewCard from "./OverviewCard";
import ItineraryCard from "./ItineraryCard";
import { getTotalDuration } from "../../utils/getTotalDuration";
import type { Itinerary } from "../../interfaces/ConfirmedFlightOffer";

interface Props {
  itineraries: Itinerary[];
  airlineName: string[];
  cabin: string;
}

export default function FlightItineraryDetails({
  itineraries,
  airlineName,
  cabin,
}: Props) {
  // Flatten all segments
  const allSegments = itineraries.flatMap((it) => it.segments);

  // Total stops = sum of numberOfStops across all segments
  const totalStops = allSegments.length - itineraries.length;

  return (
    <div>
      {/* Itinerary Overview */}
      <section>
        <h2 className="font-bold mb-8">Overview</h2>

        <div className="grid min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 text-sm">
          <OverviewCard
            icon={<FaClock />}
            heading="Duration"
            content={getTotalDuration(itineraries)}
          />
          <OverviewCard
            icon={<FaStopCircle />}
            heading="Stops"
            content={
              totalStops === 0
                ? "Non-stop"
                : `${totalStops} stop${totalStops > 1 ? "s" : ""}`
            }
          />
          <OverviewCard icon={<FaChair />} heading="Cabin" content={cabin} />

          <OverviewCard
            icon={<FaPlane />}
            heading="Airline"
            content={airlineName}
          />
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="my-16">
        <h2 className="font-bold mb-8">Itinerary Timeline</h2>

        <div className="flex flex-col gap-5 justify-center items-center">
          {itineraries.map((itinerary, idx) => (
            <div key={idx} className="w-full">
              <h3 className="font-semibold text-center mb-4 text-[var(--color-accent)]">
                {idx === 0 ? "Outbound Flight" : "Return Flight"}
              </h3>

              {itinerary.segments.map((seg, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col gap-5 justify-center items-center"
                >
                  <ItineraryCard segment={seg} />
                  {sIdx < itinerary.segments.length - 1 && (
                    <div className="mb-5 w-full max-w-md flex gap-2 justify-center items-center text-sm border border-[var(--color-border)] rounded-3xl p-4 shadow-md">
                      <FaClock size={16} />{" "}
                      <span className="text-[var(--color-text-muted)]">
                        {/* Example static layover placeholder */}
                        Layover between flights
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
