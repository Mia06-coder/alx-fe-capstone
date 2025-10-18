// src/components/forms/AirportInput.tsx
import { useState, useEffect } from "react";
import { fetchAirports } from "../../api/airportLocations";
import Input from "./Input";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";

interface AirportOption {
  iataCode: string;
  name: string;
  detailedName: string;
  address: {
    cityName: string;
    countryName: string;
  };
}

interface AirportInputProps {
  label: string;
  value?: string;
  onSelect: (code: string) => void;
}

export default function AirportInput({
  label,
  value = "",
  onSelect,
}: AirportInputProps) {
  const [query, setQuery] = useState(value);
  const [options, setOptions] = useState<AirportOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // only initialize query once from value (not every time value changes)
  useEffect(() => {
    if (value && !query) setQuery(value);
  }, []);

  // fetch airport suggestions with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length < 2) {
        setOptions([]);
        return;
      }

      try {
        setIsLoading(true);
        const airports = await fetchAirports(query);
        setOptions(airports?.data || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching airports:", error);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [query]);

  const handleSelect = (option: AirportOption) => {
    setQuery(`${option.address?.cityName} (${option.iataCode})`);
    onSelect(option.iataCode);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor={label.toLocaleLowerCase()}
        className="block text-xs mb-1 text-[var(--color-text-secondary)]"
      >
        {label}
      </label>
      <Input
        id={label.toLocaleLowerCase()}
        label={label}
        name={label.toLocaleLowerCase()}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter city or airport"
        icon={
          label === "ORIGIN" ? (
            <FaPlaneDeparture size={16} />
          ) : (
            <FaPlaneArrival size={16} />
          )
        }
        autoComplete="off"
      />

      {isOpen && (
        <ul className="absolute z-20 w-full max-h-50 overflow-y-auto mt-1 rounded-xl overflow-hidden shadow-lg bg-[var(--color-bg-solid)] border border-[var(--color-border)]">
          {isLoading ? (
            <li className="px-4 py-2 text-sm text-[var(--color-text-secondary)]">
              Loading...
            </li>
          ) : options.length > 0 ? (
            options.map((opt) => (
              <li
                key={opt.iataCode}
                onClick={() => handleSelect(opt)}
                className="flex flex-col px-4 py-2 cursor-pointer transition hover:bg-[var(--color-accent)] hover:text-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">
                    {opt.address?.cityName}
                  </span>
                  <span className="text-xs opacity-80">{opt.iataCode}</span>
                </div>
                <span className="text-xs opacity-70">
                  {opt.address?.countryName} — {opt.name}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-[var(--color-text-secondary)]">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
