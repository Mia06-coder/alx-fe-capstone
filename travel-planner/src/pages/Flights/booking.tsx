// src/pages/booking.tsx
import { useEffect, useState } from "react";
import type { Billing, FlightOrder, Traveler } from "../../interfaces/Booking";
import { FaChevronRight, FaCheck } from "react-icons/fa";
import { createTravelersFromPricing } from "../../utils/createTravelersFromPricing";
import { useLocation } from "react-router-dom";
import PassengerModal from "../../components/PassengerModal";
import BookingHeader from "../../components/flight/BookingHeader";
import ItineraryFareDetails from "../../components/flight/ItineraryFareDetails";
import Button from "../../components/common/Button";
import type { FlightOffer } from "../../interfaces/ConfirmedFlightOffer";
import BillingModal from "../../components/flight/BillingModal";
import { bookFlight } from "../../api/flightBooking";
import type { FlightOrderResponse } from "../../interfaces/FlightOrderResponse";
import BookingSuccessModal from "../../components/flight/BookingSuccessModal";

export default function FlightBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<FlightOrderResponse | null>(
    null
  );
  const [passengers, setPassengers] = useState<Traveler[]>([]);
  const [activePassenger, setActivePassenger] = useState<Traveler | null>(null);

  const billing: Billing = {
    addresseeName: { firstName: "", middleName: "", lastName: "" },
    companyName: "N/A",
    purpose: "STANDARD",
    phones: [{ deviceType: "MOBILE", countryCallingCode: "263", number: "" }],
    emailAddress: "",
    address: {
      lines: ["", "null"],
      postalCode: "",
      cityName: "",
      countryCode: "",
    },
  };

  const [billingData, setBillingData] = useState<Billing>(billing);
  const [showBillingModal, setShowBillingModal] = useState(false);

  const location = useLocation();
  const flight: FlightOffer = location.state?.flight;

  const billingCompleted =
    billingData.addresseeName.firstName &&
    billingData.addresseeName.lastName &&
    billingData.companyName &&
    billingData.emailAddress &&
    billingData.purpose &&
    billingData.phones.length > 0 &&
    billingData.address.lines.length > 0 &&
    billingData.address.cityName &&
    billingData.address.postalCode &&
    billingData.address.countryCode;

  const handleConfirmBooking = async () => {
    if (!billingData || passengers.length === 0) {
      alert("Please fill in all traveler and billing details.");
      return;
    }
    const order: FlightOrder = {
      data: {
        type: "flight-order",
        flightOffers: [flight], // From search results or itinerary
        travelers: passengers,
        contacts: [billingData],
        remarks: {
          general: [
            {
              subType: "GENERAL_MISCELLANEOUS",
              text: "Booking created via Voyant",
            },
          ],
        },
        ticketingAgreement: {
          option: "DELAY_TO_CANCEL",
          delay: "6D", // example: 6 days
        },
      },
    };

    try {
      setLoading(true);
      const confirmation = await bookFlight(order);
      setBookingData(confirmation);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to book flight.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBillingSave = (updatedBilling: Billing) => {
    setBillingData(updatedBilling);
    setShowBillingModal(false);
  };

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
    <div className="max-w-2xl md:max-w-6xl md:flex gap-10 mx-auto p-6 mt-8 space-y-4">
      <BookingHeader flight={flight} />
      <div className="lg:flex-2/3">
        {/* Passenger Info */}
        <div className="mb-8 p-4 bg-[var(--color-bg-solid)] rounded-2xl border border-[var(--color-border)] shadow hover:shadow-md transition ">
          <h2 className="font-semibold mb-3">Passenger Information</h2>
          {passengers.map((passenger) => {
            const completed =
              passenger.name.firstName &&
              passenger.name.lastName &&
              passenger.gender &&
              passenger.documents[0].number &&
              passenger.documents[0].issuanceCountry &&
              passenger.documents[0].issuanceLocation &&
              passenger.documents[0].nationality &&
              passenger.documents[0].validityCountry &&
              passenger.documents[0].issuanceDate &&
              passenger.documents[0].expiryDate;
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

        {/* Billing Info*/}
        <div className="mb-8 p-4 bg-[var(--color-bg-solid)] rounded-2xl border border-[var(--color-border)] shadow hover:shadow-md transition">
          <h2 className="font-semibold mb-3">Billing Information</h2>

          <div
            onClick={() => {
              setShowBillingModal(true);
            }}
            className="flex items-center justify-between py-4 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] font-bold text-[var(--color-text-primary)]">
                B
              </div>

              <div>
                <p className="font-medium text-[var(--color-text-primary)]">
                  Billing Contact
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {billingCompleted
                    ? "Details completed"
                    : "Tap to add billing details"}
                </p>
              </div>
            </div>

            {billingCompleted ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaChevronRight className="text-[var(--color-text-muted)]" />
            )}
          </div>

          {showBillingModal && (
            <BillingModal
              billing={billingData}
              onSave={handleBillingSave}
              onClose={() => setShowBillingModal(false)}
            />
          )}
        </div>

        <ItineraryFareDetails travelerPricings={flight.travelerPricings} />
        {/* Disclaimer */}
        <p className="flex gap-2 text-sm text-[var(--color-text-muted)] m-8 max-w-2xl mx-auto">
          <span>*</span>
          <span>
            Fares are not guaranteed until ticketing is complete. Prices may
            vary based on availability and exchange rates. Additional baggage
            and seat selection charges may apply
          </span>
        </p>

        {/* Error */}
        {error && <div className="text-red-500">Error: {error}</div>}

        {/* Confirm Button */}
        <Button
          label={loading ? `Booking Flight...` : `Confirm & Pay`}
          ariaLabel={`Confirm booking `}
          onClick={handleConfirmBooking}
          className="mt-6 block mx-auto bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700 bottom-4 backdrop-blur-4xl sticky"
        />

        {bookingData && (
          <BookingSuccessModal
            booking={bookingData}
            onClose={() => setBookingData(null)}
          />
        )}
      </div>
    </div>
  );
}
