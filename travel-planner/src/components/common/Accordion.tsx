import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { AccordionProps } from "../../interfaces/Accordion";

export default function Accordion({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 font-medium text-left"
      >
        {title}
        {isOpen ? (
          <FaChevronDown className="w-5 h-5" />
        ) : (
          <FaChevronRight className="w-5 h-5" />
        )}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}
