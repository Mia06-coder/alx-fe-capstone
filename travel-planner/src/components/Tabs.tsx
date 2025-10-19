// src/components/Tabs.tsx
import { FaHotel, FaMap, FaPlane } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom"; // if using React Router

const tabs = [
  { label: "Flights", icon: FaPlane, path: "/" },
  { label: "Hotels", icon: FaHotel, path: "/hotels" },
  { label: "Attractions", icon: FaMap, path: "/attractions" },
];

export default function Tabs() {
  const location = useLocation(); // gets current route path

  return (
    <nav className="mx-auto my-6 text-lg font-semibold max-w-md">
      <ul className="grid grid-cols-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <li
              key={tab.path}
              className={`border-b-2 ${
                isActive
                  ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)]"
              }`}
            >
              <Link
                to={tab.path}
                className="flex gap-2 p-3 justify-center items-center"
              >
                <Icon size={16} />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
