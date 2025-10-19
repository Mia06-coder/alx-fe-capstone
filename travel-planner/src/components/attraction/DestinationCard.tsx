// src/components/attraction/DestinationCard.tsx
import type { Activity } from "../../interfaces/CityActivities";
import { FaClock } from "react-icons/fa";
import Button from "../common/Button";
import { useItinerary } from "../../hooks/useItinerary";

export default function DestinationCard({ act }: { act: Activity }) {
  const { addItem, items } = useItinerary();

  const handleAdd = () => {
    addItem({ id: act.id, type: "activity", data: act });
  };

  const alreadyAdded = items.some((i) => i.id === act.id);

  return (
    <div className="p-2 bg-white/10 flex border border-[var(--color-border)] rounded-2xl overflow-hidden shadow">
      <div className="relative overflow-hidden w-35 h-full shrink-0 rounded-2xl">
        <div className="absolute inset-0 bg-black/35 rounded-2xl"></div>

        <img
          src={act.pictures[0] || "https://placehold.co/600x400/834578/FFF"}
          alt={act.name}
          className="w-full h-full object-cover rounded-2xl"
        />
        {act.minimumDuration && (
          <span className="absolute flex items-center gap-1 top-0 left-1 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-700 text-white text-xs font-medium px-2 py-0.5 rounded-tl-2xl rounded-br-2xl mt-2">
            {act.minimumDuration
              .replace("hours", "hrs")
              .replace("hour", "hr")
              .replace("minutes", "min")}
            <FaClock size={12} />
          </span>
        )}
      </div>
      <div className="px-3 py-2 flex flex-col justify-between flex-1">
        <h3 className="font-semibold line-clamp-1">{act.name}</h3>
        <div
          className="text-sm text-[var(--color-text-secondary)] line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: act.shortDescription || act.description,
          }}
        />
        <p className="text-sm font-bold mt-1 mb-6">
          {act.price.currencyCode} {Math.round(Number(act.price.amount))}
        </p>
        <a
          href={act.bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] text-sm text-center font-semibold px-3 py-2 border-2 border-[var(--color-accent)] rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-colors"
        >
          Book Now
        </a>
        <Button
          label={alreadyAdded ? "Added" : "Add to Itinerary"}
          onClick={handleAdd}
          disabled={alreadyAdded}
          className="mt-3 bg-[var(--color-accent)] text-white px-4 py-2 rounded"
        />
      </div>
    </div>
  );
}
