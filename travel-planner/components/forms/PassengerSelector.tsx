import { useState, useRef, useEffect } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaMinus, FaPlus } from "react-icons/fa";

// Accessible hook to close modal when clicking outside
function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  onClose: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
}

export default function PassengerSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => setIsOpen(false));

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
        <FaPeopleGroup
          size={16}
          className="text-[var(--color-placeholder)] shrink-0"
        />
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
              onChange={setAdults}
              min={1}
            />

            {/* Children */}
            <PassengerRow
              label="Children"
              description="(2–12 years)"
              count={children}
              onChange={setChildren}
              min={0}
            />

            {/* Infants */}
            <PassengerRow
              label="Infants"
              description="(<2 years)"
              count={infants}
              onChange={setInfants}
              min={0}
            />
          </div>

          {/* Info */}
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            For our youngest guests, infants are seated on a guardian’s lap.
          </p>

          {/* Done button */}
          <div className="flex justify-end mt-4">
            <button
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

// Sub-component for each passenger category
function PassengerRow({
  label,
  description,
  count,
  onChange,
  min,
}: {
  label: string;
  description: string;
  count: number;
  onChange: (n: number) => void;
  min: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-[var(--color-text-primary)] text-sm">
          {label}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label={`Decrease ${label}`}
          disabled={count <= min}
          onClick={() => onChange(count - 1)}
          className={`p-1 rounded-full border border-[var(--color-border)] ${
            count <= min
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-[var(--color-border)]/20"
          }`}
        >
          <FaMinus size={12} />
        </button>
        <span className="text-sm text-[var(--color-text-primary)] w-4 text-center">
          {count}
        </span>
        <button
          aria-label={`Increase ${label}`}
          onClick={() => onChange(count + 1)}
          className="p-1 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-border)]/20"
        >
          <FaPlus size={12} />
        </button>
      </div>
    </div>
  );
}
