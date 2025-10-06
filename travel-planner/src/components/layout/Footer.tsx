import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="w-full bg-blue-900 text-slate-100"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="container mx-auto pt-12 p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Branding & Description */}
          <div>
            <h2 className="font-bold text-xl">Voyant</h2>
            <p className="mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
              Plan your trips with ease. Find flights, hotels, and activities
              all in one place.
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-bold">Follow Us</h3>
            <ul className="mt-3 flex gap-3">
              {/* LinkedIn Icon */}
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our LinkedIn profile (opens in a new tab)"
                  className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                >
                  <FaLinkedin size={32} aria-hidden="true" />
                </a>
              </li>

              {/* Facebook Icon */}
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our Facebook page (opens in a new tab)"
                  className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                >
                  <FaFacebookSquare size={32} aris-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 pt-4 border-t border-slate-300 md:text-center text-xs md:text-sm text-slate-300">
          © 2025 TravelPlanner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
