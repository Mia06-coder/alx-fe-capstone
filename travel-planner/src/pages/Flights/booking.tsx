// src/pages/BookingPage.tsx
import { useEffect, useState } from "react";
import type { Traveler } from "../../interfaces/Booking";
import { FaChevronRight, FaCheck } from "react-icons/fa";
import { createTravelersFromPricing } from "../../utils/createTravelersFromPricing";
import { useLocation } from "react-router-dom";

export default function FlightBooking() {
  const [passengers, setPassengers] = useState<Traveler[]>([]);
  const [activePassenger, setActivePassenger] = useState<Traveler | null>(null);
  const location = useLocation();
  const flight = location.state?.flight;

  useEffect(() => {
    if (flight?.travelerPricings?.length) {
      const generated = createTravelersFromPricing(flight.travelerPricings);
      setPassengers(generated);
    }
  }, [flight]);

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 space-y-4">
      {passengers.map((passenger) => {
        const completed =
          passenger.name.firstName &&
          passenger.name.lastName &&
          passenger.contact.emailAddress;
        const initials =
          passenger.name.firstName && passenger.name.lastName
            ? `${passenger.name.firstName[0]}${passenger.name.lastName[0]}`
            : passenger.type[0];

        return (
          <div
            key={passenger.id}
            onClick={() => setActivePassenger(passenger)}
            className="flex items-center justify-between p-4 bg-[var(--color-bg-solid)] rounded-2xl shadow hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] font-bold text-[var(--color-text-primary)]">
                {initials.toUpperCase()}
              </div>

              <div>
                <p className="font-medium text-[var(--color-text-primary)]">
                  {passenger.name.firstName
                    ? `${passenger.name.firstName} ${passenger.name.lastName}`
                    : `${passenger.type} `}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {completed ? "Details completed" : "Tap to add details"}
                </p>
              </div>
            </div>

            {completed ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaChevronRight className="text-[var(--color-text-muted)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
