import Tabs from "../components/Tabs.tsx";
import { FLIGHT_IMAGES_PATH } from "../constants.ts";
import { FaMinus, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import Input from "../components/forms/Input.tsx";
import { FaArrowsLeftRight } from "react-icons/fa6";
import PassengerSelector from "../components/forms/PassengerSelector.tsx";
import DirectFlightsToggle from "../components/DirectFlightsToggle.tsx";

function App() {
  return (
    <div className="container mx-auto p-6">
      <Tabs />
      <div className="my-15 flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-32">
        <div className="grid grid-cols-3 grid-rows-6 gap-3 aspect-square max-w-sm">
          <img
            src={`${FLIGHT_IMAGES_PATH}/flight2.jpg`}
            alt=""
            className="w-full h-full row-span-3 rounded-l-3xl"
          />
          <h2 className="col-span-2 text-right text-2xl font-bold">
            Find <span className="text-yellow-500">Your</span> Perfect{" "}
            <span className="text-[var(--color-accent)]">Flight</span>
          </h2>
          <p className="col-span-2 text-right">
            Compare premium fares and discover the best routes worldwide.
          </p>
          <img
            src={`${FLIGHT_IMAGES_PATH}/flight5.jpg`}
            alt=""
            className="w-full h-full row-span-2 rounded-3xl rounded-tl-none"
          />
          <div></div>
          <img
            src={`${FLIGHT_IMAGES_PATH}/flight3.jpg`}
            alt=""
            className="w-full h-full row-span-3 rounded-l-3xl"
          />
          <img
            src={`${FLIGHT_IMAGES_PATH}/flight1.jpg`}
            alt=""
            className="w-full h-full row-span-3 rounded-r-3xl"
          />
          <img
            src={`${FLIGHT_IMAGES_PATH}/flight4.jpg`}
            alt=""
            className="w-full h-full row-span-2 rounded-3xl"
          />
        </div>

        <form action="POST" className="flex flex-col gap-4 w-full max-w-lg">
          {/* Flight origin and destination inputs */}
          <div className="flex items-center gap-2 w-full ">
            <Input
              input={{
                id: "origin",
                label: "ORIGIN",
                name: "origin",
                type: "text",
                placeholder: "Where from?",
                icon: <FaPlaneDeparture />,
                required: true,
              }}
            />

            <button type="button">
              <FaArrowsLeftRight
                size={20}
                className="text-[var(--color-placeholder)]"
              />
            </button>

            <Input
              input={{
                id: "destination",
                label: "DESTINATION",
                name: "destination",
                type: "text",
                placeholder: "Where to?",
                icon: (
                  <FaPlaneArrival
                    size={16}
                    className="text-[var(--color-placeholder)]"
                  />
                ),
                required: true,
              }}
            />
          </div>

          {/* Check-in and check-out date inputs */}
          <div className="flex items-center gap-2 w-full ">
            <Input
              input={{
                id: "check-in-date",
                label: "CHECK-IN DATE",
                name: "check-in-date",
                type: "date",
                placeholder: "Check-in",
                required: true,
              }}
            />

            <button type="button">
              <FaMinus size={20} className="text-[var(--color-placeholder)]" />
            </button>

            <Input
              input={{
                id: "check-out-date",
                label: "CHECK-OUT DATE",
                name: "check-out-date",
                type: "date",
                placeholder: "Check-out",

                required: true,
              }}
            />
          </div>

          {/* Passengers inputs */}
          <PassengerSelector />

          {/* Cabin class select */}
          <div className="flex items-center flex-1 min-w-0  p-3 bg-[var(--color-bg-solid)] border border-[var(--color-border)] rounded-lg gap-2">
            <label htmlFor="cabin-class" className="sr-only">
              CABIN CLASS
            </label>
            <select
              name="cabin-class"
              id="class"
              className="w-full bg-[var(--color-bg-solid)] text-[var(--color-text-primary)] text-sm"
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </select>
          </div>

          <DirectFlightsToggle />

          <button
            type="submit"
            className="mt-5 w-full p-3 bg-[var(--color-accent)] text-[var(--color-bg-solid)] font-semibold rounded-full hover:bg-yellow-500 transition"
          >
            Search Flights
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
