import { FaHotel, FaMap, FaPlane } from "react-icons/fa";

export default function Tabs() {
  return (
    <nav className="mt-6 mb-2 text-lg font-semibold max-w-md">
      <ul className="grid grid-cols-3">
        <li className="border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]">
          <a href="/" className="flex gap-2 p-3 justify-center items-center">
            <FaPlane size={16} />
            Flights
          </a>
        </li>
        <li className="border-b-2 border-[var(--color-border)] text-[var(--color-text-muted)]">
          <a href="/" className="flex gap-2 p-3 justify-center items-center">
            <FaHotel size={16} />
            Hotels
          </a>
        </li>
        <li className="border-b-2 border-[var(--color-border)] text-[var(--color-text-muted)]">
          <a href="/" className="flex gap-2 p-3 justify-center items-center">
            <FaMap size={16} />
            Attractions
          </a>
        </li>
      </ul>
    </nav>
  );
}
