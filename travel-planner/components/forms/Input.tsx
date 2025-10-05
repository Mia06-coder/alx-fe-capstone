import type { InputProps } from "../../interfaces/Input.ts";

export default function Input({ input }: { input: InputProps }) {
  return (
    <div className="flex items-center flex-1 min-w-0 p-3 bg-[var(--color-bg-solid)] border border-[var(--color-border)] rounded-lg gap-2">
      <label htmlFor={input.name} className="sr-only">
        {input.label}
      </label>
      <input
        type={input.type}
        id={input.id}
        name={input.name}
        placeholder={input.placeholder}
        value={input.value}
        onChange={input.onChange}
        required={input.required}
        className={`w-full bg-transparent outline-none text-[var(--color-text-primary)] placeholder-[var(--color-placeholder)] text-sm ${
          input.style || ""
        }`}
      />
      {input.icon && (
        <span className="shrink-0 text-base text-[var(--color-placeholder)]">
          {input.icon}
        </span>
      )}
    </div>
  );
}
