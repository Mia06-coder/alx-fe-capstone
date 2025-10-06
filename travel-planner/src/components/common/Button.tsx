import type { ButtonProps } from "../../interfaces/Button";

export default function Button(btn: ButtonProps) {
  return (
    <button
      type={btn.type || "button"}
      className={`w-full max-w-md px-2 py-3 font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${btn.className}`}
      aria-label={btn.ariaLabel || btn.label}
      disabled={btn.disabled}
      onClick={btn.onClick}
    >
      {btn.label}
    </button>
  );
}
