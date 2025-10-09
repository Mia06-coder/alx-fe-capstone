// src/pages/BookingPage.tsx
import { useEffect, useState } from "react";
import type { Traveler } from "../../interfaces/Booking";
import { FaChevronRight, FaCheck } from "react-icons/fa";
import { createTravelersFromPricing } from "../../utils/createTravelersFromPricing";
import { Link, useLocation } from "react-router-dom";
import PassengerModal from "../../components/PassengerModal";
import Button from "../../components/common/Button";
import { FaArrowLeftLong } from "react-icons/fa6";

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

  const handleSave = (updatedPassenger: Traveler) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === updatedPassenger.id ? updatedPassenger : p))
    );
    setActivePassenger(null);
  };
  return (
    <div className="max-w-xl mx-auto p-6 mt-8 space-y-4">
      <div className="p-4 bg-[var(--color-bg-solid)] rounded-2xl border border-[var(--color-border)] shadow hover:shadow-md transition ">
        <h2 className="font-semibold mb-3">Passenger Information</h2>
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
              className="flex items-center justify-between py-4 cursor-pointer"
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

        {activePassenger && (
          <PassengerModal
            passenger={activePassenger}
            onSave={handleSave}
            onClose={() => setActivePassenger(null)}
          />
        )}
      </div>
      {/* Disclaimer */}
      <p className="flex gap-2 text-sm text-[var(--color-text-muted)] m-8 max-w-2xl mx-auto">
        <span>*</span>
        <span>
          Fares are not guaranteed until ticketing is complete. Prices may vary
          based on availability and exchange rates. Additional baggage and seat
          selection charges may apply
        </span>
      </p>
      <Button
        label="Confirm & Pay"
        type="submit"
        ariaLabel="Confirm booking"
        className="mt-6 block mx-auto bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700"
      />
      <Link
        to="/flights/results"
        aria-label="Back to Results"
        className="p-4 flex gap-2 justify-center items-center text-[var(--color-accent)] font-medium"
      >
        <FaArrowLeftLong />
        Go back to results
      </Link>
    </div>
  );
}
