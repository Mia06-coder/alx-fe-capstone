import { FaMinus, FaPlus } from "react-icons/fa";

// Sub-component for each passenger category
export default function PassengerRow({
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
          type="button"
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
          type="button"
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
