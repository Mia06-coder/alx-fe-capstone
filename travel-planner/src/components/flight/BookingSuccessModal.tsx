// src/components/BookingSuccessModal.tsx

import { FaCheckCircle } from "react-icons/fa";
import type { FlightOrderResponse } from "../../interfaces/FlightOrderResponse";
import Button from "../common/Button";

interface Props {
  booking: FlightOrderResponse;
  onClose: () => void;
}

export default function BookingSuccessModal({ booking, onClose }: Props) {
  const record = booking.associatedRecords?.[0];
  const travelers = booking.travelers;
  const price = booking.flightOffers?.[0]?.price;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg-solid)] rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-2xl">
          &times;
        </button>

        <div className="text-center">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
          <h2 className="text-2xl font-semibold">Booking Confirmed!</h2>
          <p className="opacity-70 mt-1">
            Reference:{" "}
            <span className="font-semibold">{record?.reference}</span>
          </p>
        </div>

        <div className="mt-5 border-t pt-4 text-sm space-y-2">
          <p>
            <span className="font-medium">Travelers:</span>{" "}
            {travelers.map((traveler, idx) => (
              <span key={idx}>
                {traveler?.name.firstName} {traveler?.name.lastName}
                {travelers.length - 1 > idx && `,`}
              </span>
            ))}
          </p>
          <p>
            <span className="font-medium">Itinerary:</span>{" "}
            {
              booking.flightOffers[0].itineraries[0].segments[0].departure
                .iataCode
            }{" "}
            →{" "}
            {
              booking.flightOffers[0].itineraries[0].segments.slice(-1)[0]
                .arrival.iataCode
            }
          </p>
          <p>
            <span className="font-medium">Total Price:</span> {price?.currency}{" "}
            {price?.grandTotal}
          </p>
          <p>
            <span className="font-medium">Ticketing Delay:</span>{" "}
            {booking.ticketingAgreement?.delay}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button
            label="Done"
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          />
        </div>
      </div>
    </div>
  );
}
