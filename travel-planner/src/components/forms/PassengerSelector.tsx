import { useState, useRef } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import PassengerRow from "./PassengerRow";

interface PassengerSelectorProps {
  adults: number;
  children: number;
  infants: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  setInfants: (value: number) => void;
}

export default function PassengerSelector({
  adults,
  children,
  infants,
  setAdults,
  setChildren,
  setInfants,
}: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, () => setIsOpen(false));

  const updateAdults = (value: number) => {
    if (value < 1) return;
    if (value + children + infants > 9) {
      setError("You can only book up to 9 passengers total.");
      return;
    }
    if (infants > value) {
      setError("Infants cannot exceed the number of adults.");
      return;
    }
    setError(null);
    setAdults(value);
  };

  const updateChildren = (value: number) => {
    if (value < 0) return;
    if (adults + value + infants > 9) {
      setError("You can only book up to 9 passengers total.");
      return;
    }
    setError(null);
    setChildren(value);
  };

  const updateInfants = (value: number) => {
    if (value < 0) return;
    if (adults + children + value > 9) {
      setError("You can only book up to 9 passengers total.");
      return;
    }
    if (value > adults) {
      setError("Each infant must be accompanied by an adult.");
      return;
    }
    setError(null);
    setInfants(value);
  };

  // Format displayed value like “2 Adults, 1 Child”
  const formattedPassengers = `${adults} Adult${adults > 1 ? "s" : ""}${
    children ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""
  }${infants ? `, ${infants} Infant${infants > 1 ? "s" : ""}` : ""}`;

  return (
    <div className="relative w-full max-w-lg">
      {/* Main input */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-solid)] cursor-pointer"
      >
        <FaPeopleGroup size={16} />
        <span className="text-sm text-[var(--color-text-primary)] truncate">
          {formattedPassengers}
        </span>
      </div>

      {/* Dropdown Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="absolute left-0 right-0 mt-2 bg-[var(--color-bg-solid)] border border-[var(--color-border)] rounded-lg shadow-lg p-4 z-50"
          role="dialog"
          aria-label="Passenger selection"
        >
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">
            Passengers
          </h3>

          {/* Passenger Categories */}
          <div className="flex flex-col gap-3">
            {/* Adults */}
            <PassengerRow
              label="Adults"
              description="(2+ years)"
              count={adults}
              onChange={updateAdults}
              min={1}
            />

            {/* Children */}
            <PassengerRow
              label="Children"
              description="(2–12 years)"
              count={children}
              onChange={updateChildren}
              min={0}
            />

            {/* Infants */}
            <PassengerRow
              label="Infants"
              description="(<2 years)"
              count={infants}
              onChange={updateInfants}
              min={0}
            />
          </div>

          {/* Info */}
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            For our youngest guests, infants are seated on a guardian’s lap.
          </p>

          {/* Error Message */}
          {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

          {/* Done button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-[var(--color-accent)] text-white text-sm rounded-lg hover:opacity-90 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
