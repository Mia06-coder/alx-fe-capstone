// src/components/forms/FlightSearchForm.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useFlight } from "../../hooks/useFlight";
import type { FlightOfferParams } from "../../interfaces/FlightOffersParams";
import { FaArrowsLeftRight } from "react-icons/fa6";
import PassengerSelector from "./PassengerSelector";
import DirectFlightsToggle from "./DirectFlightsToggle";
import Button from "../common/Button";
import FlightDateInputs from "./FlightDateInputs";
import AirportInput from "./AirportInput";

export default function FlightSearchForm({
  onSearch,
}: {
  onSearch?: () => void;
}) {
  const { fetchFlights, searchParams } = useFlight();
  const navigate = useNavigate();

  const [originLocationCode, setOriginLocationCode] = useState(
    searchParams?.originLocationCode || ""
  );
  const [destinationLocationCode, setDestinationLocationCode] = useState(
    searchParams?.destinationLocationCode || ""
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams?.departureDate || ""
  );
  const [returnDate, setReturnDate] = useState(searchParams?.returnDate || "");
  const [adults, setAdults] = useState(searchParams?.adults || 1);
  const [children, setChildren] = useState(searchParams?.children || 0);
  const [infants, setInfants] = useState(searchParams?.infants || 0);
  const [travelClass, setTravelClass] = useState<
    FlightOfferParams["travelClass"]
  >(searchParams?.travelClass || "ECONOMY");
  const [nonStop, setNonStop] = useState(searchParams?.nonStop || false);
  const [hasError, setHasError] = useState(false);

  {
    /* Handle form submission */
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const params: FlightOfferParams = {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      returnDate,
      children,
      infants,
      travelClass,
      nonStop,
    };

    try {
      navigate("/flights/results");
      onSearch?.(); // close overlay when loading
      await fetchFlights(params);
    } catch (err) {
      console.error(`Flights search failed: ${err}`);
    }
  };

  return (
    <>
      {/* Flight search form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-lg"
      >
        {/* Flight origin and destination inputs */}
        <div className="flex items-center gap-2 w-full ">
          <AirportInput
            label="ORIGIN"
            value={originLocationCode}
            onSelect={(code) => setOriginLocationCode(code)}
          />

          <button
            type="button"
            onClick={() => {
              setOriginLocationCode(destinationLocationCode);
              setDestinationLocationCode(originLocationCode);
            }}
          >
            <FaArrowsLeftRight
              size={20}
              className="text-[var(--color-placeholder)]"
            />
          </button>

          <AirportInput
            label="DESTINATION"
            value={destinationLocationCode}
            onSelect={(code) => setDestinationLocationCode(code)}
          />
        </div>

        {/* Check-in and check-out date inputs */}
        <FlightDateInputs
          departureDate={departureDate}
          returnDate={returnDate}
          setDepartureDate={setDepartureDate}
          setReturnDate={setReturnDate}
          setHasError={setHasError}
        />

        {/* Passengers inputs */}
        <PassengerSelector
          adults={adults}
          children={children}
          infants={infants}
          setAdults={setAdults}
          setChildren={setChildren}
          setInfants={setInfants}
        />

        {/* Cabin class select */}
        <div className="flex items-center flex-1 min-w-0  p-3 bg-[var(--color-bg-solid)] border border-[var(--color-border)] rounded-lg gap-2">
          <label htmlFor="cabin-class" className="sr-only">
            CABIN CLASS
          </label>
          <select
            name="cabin-class"
            id="class"
            value={travelClass}
            onChange={(e) =>
              setTravelClass(e.target.value as FlightOfferParams["travelClass"])
            }
            className="w-full bg-[var(--color-bg-solid)] text-[var(--color-text-primary)] text-sm"
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>

        <DirectFlightsToggle nonStop={nonStop} setNonStop={setNonStop} />

        <Button
          label="Search Flights"
          type="submit"
          className="mt-5 mx-auto bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-700 text-white rounded-full  hover:from-yellow-600 hover:via-amber-700 hover:to-yellow-800 focus:ring-amber-400 ${hasError}?"
          disabled={hasError}
          ariaLabel="Search Flights"
        />
      </form>
    </>
  );
}
