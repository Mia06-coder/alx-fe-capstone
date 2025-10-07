import { FaArrowsLeftRight } from "react-icons/fa6";
import Tabs from "../../components/Tabs";
import Button from "../../components/common/Button";
import flightHero from "../../assets/images/flights/passport.jpg";
import flightLogo from "../../assets/images/flights/flight2.jpg";

export default function FlightsResults() {
  const flights = [
    {
      id: 1,
      airline: "Emirates",
      departure: "HRE",
      arrival: "DXB",
      duration: "8h 25m",
      price: "$650",
    },
    {
      id: 2,
      airline: "Qatar Airways",
      departure: "HRE",
      arrival: "DXB",
      duration: "8h 45m",
      price: "$620",
    },
    {
      id: 3,
      airline: "Ethiopian Airlines",
      departure: "HRE",
      arrival: "DXB",
      duration: "7h 15m",
      price: "$580",
    },
    {
      id: 4,
      airline: "Turkish Airlines",
      departure: "HRE",
      arrival: "DXB",
      duration: "9h 05m",
      price: "$600",
    },
    {
      id: 5,
      airline: "KLM",
      departure: "HRE",
      arrival: "DXB",
      duration: "8h 30m",
      price: "$640",
    },
    {
      id: 6,
      airline: "Lufthansa",
      departure: "HRE",
      arrival: "DXB",
      duration: "8h 50m",
      price: "$630",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Tabs */}
      <Tabs />

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

      {/* Flight Cards */}
      <div className="my-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="p-4 border border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-slate-100 via-sky-50 to-sky-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-md"
          >
            <p className="text-right italic text-xs text-red-400">
              Only 9 seats left at this price!!!
            </p>

            {/* Flight summary */}
            <div className="my-3 flex justify-between text-sm">
              <div className="flex gap-2 items-center">
                <img
                  src={flightLogo}
                  alt={`${flight.airline} logo`}
                  className="w-7 h-7 rounded-full bg-rose-100 object-cover"
                />
                <p className="font-bold">{flight.airline}</p>
              </div>
              <p>
                <span className="font-semibold">{flight.duration}</span>{" "}
                <span className="text-[var(--color-text-secondary)]">
                  (1 stop)
                </span>
              </p>
            </div>

            {/* Flight details */}
            <div className="flex justify-between gap-12 text-sm p-3 border-t border-[var(--color-border)]">
              <div className="flex gap-2 items-center w-full max-w-md">
                {/* Origin */}
                <div className="flex flex-col items-center">
                  <span className="font-bold">{flight.departure}</span>
                  <span>Nov 11</span>
                  <span className="font-semibold">11:35</span>
                </div>

                <div className="flex-1 border-t border-dashed border-[var(--color-placeholder)] mx-2"></div>

                {/* Destination */}
                <div className="flex flex-col items-center">
                  <span className="font-bold">{flight.arrival}</span>
                  <span>Nov 12</span>
                  <span className="font-semibold">05:50</span>
                </div>
              </div>

              {/* Price info */}
              <div className="flex flex-col justify-center items-center text-[var(--color-text-secondary)]">
                <span className="text-xl font-bold text-[var(--color-accent)]">
                  {flight.price}
                </span>
                <span className="font-bold">Economy</span>
                <span>25kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      <Button
        label="Show More"
        className="mt-20 block mx-auto text-[var(--color-accent)] border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
      />

      {/* Disclaimer */}
      <p className="flex gap-2 text-sm text-[var(--color-text-secondary)] m-8 max-w-2xl mx-auto text-center">
        <span>*</span>
        <span>
          Displayed fares include taxes and fees. Availability is subject to
          change until your booking is completed.
        </span>
      </p>
    </div>
  );
}
