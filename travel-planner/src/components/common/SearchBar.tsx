// src/components/common/SearchBar.tsx
import type { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  query: string;
  handleSearch: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ query, handleSearch, onChange }: Props) {
  return (
    <div className="mx-auto flex justify-between gap-2 border border-[var(--color-border)]/30 bg-white/20 shadow-md backdrop-blur-md px-5 py-3 rounded-full w-full max-w-2xl">
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={onChange}
        className="w-full placeholder:text-[var(--color-text-placeholder)] focus:outline-0 focus:ring-0"
      />
      <button
        onClick={handleSearch}
        className="bg-gradient-to-tr from-yellow-500 via-amber-600 to-yellow-700 text-white p-2 rounded-full w-9 h-9"
      >
        <FaSearch size={20} />
      </button>
    </div>
  );
}
