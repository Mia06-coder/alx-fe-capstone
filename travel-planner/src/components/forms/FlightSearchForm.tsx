import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useFlight } from "../../hooks/useFlight";
import type { FlightOfferParams } from "../../interfaces/FlightOffersParams";
import Input from "./Input";
import { FaMinus, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { FaArrowsLeftRight } from "react-icons/fa6";
import PassengerSelector from "./PassengerSelector";
import DirectFlightsToggle from "./DirectFlightsToggle";
import Button from "../common/Button";

export default function FlightSearchForm() {
  const { fetchFlights } = useFlight();
  const navigate = useNavigate();

  const [originLocationCode, setOriginLocationCode] = useState("");
  const [destinationLocationCode, setDestinationLocationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] =
    useState<FlightOfferParams["travelClass"]>("ECONOMY");
  const [nonStop, setNonStop] = useState(false);

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
      await fetchFlights(params);
      navigate("/flights/results");
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
          <Input
            id="origin"
            label="ORIGIN"
            name="origin"
            type="text"
            placeholder="Where from?"
            icon={<FaPlaneDeparture size={16} />}
            value={originLocationCode}
            onChange={(e) => setOriginLocationCode(e.target.value)}
            required={true}
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

          <Input
            id="destination"
            label="DESTINATION"
            name="destination"
            type="text"
            placeholder="Where to?"
            icon={<FaPlaneArrival size={16} />}
            value={destinationLocationCode}
            onChange={(e) => setDestinationLocationCode(e.target.value)}
            required={true}
          />
        </div>

        {/* Check-in and check-out date inputs */}
        <div className="flex items-center gap-2 w-full ">
          <Input
            id="check-in-date"
            label="CHECK-IN DATE"
            name="check-in-date"
            type="date"
            placeholder="Check-in"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required={true}
          />

          <button type="button">
            <FaMinus size={20} className="text-[var(--color-placeholder)]" />
          </button>

          <Input
            id="check-out-date"
            label="CHECK-OUT DATE"
            name="check-out-date"
            type="date"
            placeholder="Check-out"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required={true}
          />
        </div>

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
            <option value="PREMIUM ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>

        <DirectFlightsToggle nonStop={nonStop} setNonStop={setNonStop} />

        <Button
          label="Search Flights"
          type="submit"
          className="mt-5 mx-auto bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-700 text-[var(--color-bg-solid)] rounded-full  hover:from-yellow-600 hover:via-amber-700 hover:to-yellow-800 focus:ring-amber-400"
          ariaLabel="Search Flights"
        />
      </form>
    </>
  );
}
