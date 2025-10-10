interface DirectFlightsToggleProps {
  nonStop: boolean;
  setNonStop: (value: boolean) => void;
}

export default function DirectFlightsToggle({
  nonStop,
  setNonStop,
}: DirectFlightsToggleProps) {
  return (
    <div className="flex items-center gap-3 mt-4">
      {/* Toggle Switch */}
      <button
        type="button"
        id="direct-flights"
        role="switch"
        aria-checked={nonStop}
        onClick={() => setNonStop(!nonStop)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition
          ${nonStop ? "bg-[var(--color-accent)]" : "bg-gray-400/40"}
          focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${nonStop ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>

      {/* Label for screen readers */}
      <label
        htmlFor="direct-flights"
        className="text-[var(--color-text-primary)] text-sm select-none"
      >
        Direct flights only
      </label>
    </div>
  );
}
