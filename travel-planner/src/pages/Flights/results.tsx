import { FaArrowsLeftRight } from "react-icons/fa6";
import Tabs from "../../components/Tabs";
import Button from "../../components/common/Button";
import flightHero from "../../assets/images/flights/passport.jpg";
import FlightCard from "../../components/flight/FlightCard";
import { Link } from "react-router-dom";
import { useFlight } from "../../hooks/useFlight";
import FlightCardSkeleton from "../../components/flight/FlightCardSkeleton";

export default function FlightsResults() {
  const { flights, loading, error } = useFlight();

  return (
    <div className="container mx-auto p-6">
      {/* Tabs */}
      <Tabs />

      {/* Hero Section */}
      <div
        className="relative flex flex-col justify-center items-center my-10 rounded-3xl shadow-lg p-6 text-center text-[var(--color-text-primary)] overflow-hidden bg-cover bg-center bg-no-repeat w-full max-w-5xl h-60 md:h-70 lg:h-80 mx-auto"
        style={{ backgroundImage: `url(${flightHero})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold text-white">
            Your Journey Begins Here
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-gray-200">
            Our platform connects you to top airlines and exclusive deals
            tailored to your preferences. Experience effortless booking,
            transparent pricing, and curated recommendations to make every trip
            as smooth as takeoff.
          </p>
        </div>
      </div>

      {/* Modify Search */}
      <div className="flex flex-col items-center text-lg mb-6">
        <div className="flex justify-center items-center gap-4">
          <span className="font-semibold">HRE</span>
          <FaArrowsLeftRight
            className="text-[var(--color-placeholder)]"
            aria-label="Direction"
          />
          <span className="font-semibold">DXB</span>
        </div>
        <button
          type="button"
          aria-label="Modify Search"
          className="text-[var(--color-accent)] font-semibold underline underline-offset-2 hover:opacity-80 focus:ring-0 bg-transparent mt-2"
          onClick={() => {}}
        >
          Modify Search
        </button>
      </div>

      {loading ? (
        <div className="my-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <FlightCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="container mx-auto p-6 text-center text-red-500">
          <p> Error: {error}</p>
        </div>
      ) : flights.length === 0 ? (
        <div className="text-center">No flights found.</div>
      ) : (
        <>
          {/* Flight Cards */}
          <div className="my-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {flights.map((flight) => (
              <Link
                to={`/flight/itinerary/${flight.id}`}
                key={flight.id}
                aria-label="View Flight Details"
              >
                <FlightCard {...flight} />
              </Link>
            ))}
          </div>

          {flights.length > 10 && (
            <>
              {/* Show More */}
              <Button
                label="Show More"
                className="mt-20 block mx-auto text-[var(--color-accent)] border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
              />
            </>
          )}

          {/* Disclaimer */}
          <p className="flex gap-2 text-sm text-[var(--color-text-secondary)] m-8 max-w-2xl mx-auto text-center">
            <span>*</span>
            <span>
              Displayed fares include taxes and fees. Availability is subject to
              change until your booking is completed.
            </span>
          </p>
        </>
      )}
    </div>
  );
}
