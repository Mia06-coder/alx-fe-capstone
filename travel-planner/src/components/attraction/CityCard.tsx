// src/components/attraction/CityCard.tsx
import type { Location } from "../../interfaces/CityLocation";

interface Props {
  onClick: (lat: number, long: number) => void;
  location: Location;
}

export default function CityCard({ onClick, location }: Props) {
  return (
    <li
      onClick={() =>
        onClick(location.geoCode.latitude, location.geoCode.longitude)
      }
      className="cursor-pointer border p-2 rounded-md hover:bg-[var(--color-accent)] transition-colors"
    >
      <strong>{location.name}</strong> ({location.address.countryCode})
    </li>
  );
}
