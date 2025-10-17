// src/pages/Flights/results.tsx
import { FaArrowsLeftRight } from "react-icons/fa6";
import Tabs from "../../components/Tabs";
import Button from "../../components/common/Button";
import flightHero from "../../assets/images/flights/passport.jpg";
import FlightCard from "../../components/flight/FlightCard";
import { Link } from "react-router-dom";
import { useFlight } from "../../hooks/useFlight";
import FlightCardSkeleton from "../../components/flight/FlightCardSkeleton";
import { useState } from "react";
import FlightSearchForm from "../../components/forms/FlightSearchForm";
import { FaTimes } from "react-icons/fa";

export default function FlightsResults() {
  const { flights, loading, error, searchParams } = useFlight();
  const [modification, SetModification] = useState(false);

  return (
    <div className="relative container mx-auto p-6">
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
      ) : (
        <div>
          {/* Modify Search */}
          <div className="flex flex-col items-center text-lg mb-6">
            <div className="flex justify-center items-center gap-4">
              <span className="font-semibold">
                {searchParams?.originLocationCode}
              </span>
              <FaArrowsLeftRight
                className="text-[var(--color-placeholder)]"
                aria-label="Direction"
              />
              <span className="font-semibold">
                {searchParams?.destinationLocationCode}
              </span>
            </div>
            <button
              type="button"
              aria-label="Modify Search"
              className="text-[var(--color-accent)] font-semibold underline underline-offset-2 hover:opacity-80 focus:ring-0 bg-transparent mt-2"
              onClick={() => SetModification(!modification)}
            >
              Modify Search
            </button>
          </div>
          {flights.length === 0 ? (
            <div className="text-center">No flights found.</div>
          ) : (
            <>
              {/* Flight Cards */}
              <div className="my-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {flights.map((flight) => (
                  <Link
                    to={`/flight/itinerary/${flight.id}`}
                    key={flight.id}
                    state={{ flight }}
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
                  Displayed fares include taxes and fees. Availability is
                  subject to change until your booking is completed.
                </span>
              </p>
            </>
          )}
        </div>
      )}

      {modification && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
          onClick={() => SetModification(false)}
        >
          <div
            className="bg-[var(--color-bg-solid)] w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-t-2xl px-6 py-18 shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="p- hover:text-[var(--color-accent)]"
              onClick={() => SetModification(false)}
            >
              <FaTimes className="text-xl" />
            </button>
            <h3 className="text-xl font-semibold text-center mb-4 text-[var(--color-accent)]">
              Modify Search
            </h3>
            <div className="mt-12 flex justify-center">
              <FlightSearchForm
                onSearch={() => SetModification(false)} // optional close handler
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
