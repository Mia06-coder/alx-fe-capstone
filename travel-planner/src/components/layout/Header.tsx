import { useState, useEffect } from "react";
import { FaGlobe, FaDollarSign, FaUserCircle } from "react-icons/fa"; // example icons

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // // Add shadow and border on scroll for visual feedback
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 w-full z-50
        transition-shadow
        ${
          scrolled
            ? "bg-[var(--color-bg-solid)] shadow-md border-b border-[var(--color-border)]"
            : ""
        }  
      `}
      role="Header"
      aria-label="Main website header"
    >
      <div className="container mx-auto flex items-center justify-between p-6">
        {/* Logo */}
        <a
          href="/"
          aria-label="Go to Voyant homepage"
          className="focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
        >
          <h1 className="text-2xl font-bold tracking-wide">Voyant</h1>
        </a>

        {/* Action buttons group*/}
        <nav aria-label="Quick access tools">
          <ul className="flex items-center gap-6">
            {/* Language translator */}
            <li>
              <button
                aria-label="Change language"
                className="hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
              >
                <FaGlobe size={20} aria-hidden="true" />
              </button>
            </li>

            {/* Currency translator */}
            <li>
              <button
                aria-label="Change currency"
                className="hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
              >
                <FaDollarSign size={20} aria-hidden="true" />
              </button>
            </li>

            {/* Profile/Login */}
            <li>
              <button
                aria-label="Open user profile or sign in"
                className="hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
              >
                <FaUserCircle size={24} aria-hidden="true" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
