// src/components/hotel/HotelCard.tsx
import type { Hotel } from "../../interfaces/Hotel";
import hotelImg from "../../assets/images/hotels/hotel1.jpg";

interface Props {
  hotel: Hotel;
  onSelect?: (hotel: Hotel) => void;
}

export default function HotelCard({ hotel, onSelect }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(hotel)}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.(hotel)}
      className="flex flex-col bg-[var(--color-bg-solid)] border border-[var(--color-border)] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {/* Image section */}
      <div className="relative h-48 w-full">
        <img
          src={hotelImg}
          alt={`Image of ${hotel.name}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-black/30 text-white text-xs font-medium py-1 px-3 rounded-full shadow-md">
          {hotel.chainCode || "Independent"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-[var(--color-text-secondary)] line-clamp-1">
          {hotel.name}
        </h3>
        <p className="text-sm opacity-80 line-clamp-1">
          {hotel.address?.cityName}, {hotel.address?.countryCode}
        </p>
        {hotel.distance?.value && (
          <p className="text-xs opacity-60">
            📍 {hotel.distance.value} {hotel.distance.unit} away
          </p>
        )}
        <div className="flex justify-end items-center pt-2">
          <span className="text-sm font-medium text-primary">
            {hotel.iataCode}
          </span>
        </div>
      </div>
    </div>
  );
}
