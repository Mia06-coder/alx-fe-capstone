import Tabs from "../../components/Tabs.tsx";
import { FLIGHT_IMAGES_PATH } from "../../../constants.ts";
import FlightSearchForm from "../../components/forms/FlightSearchForm.tsx";

export default function Flights() {
  return (
    <div className="container mx-auto p-6">
      <Tabs />

      <div className="my-15 flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-32">
        {/* Image grid and heading */}
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
        <FlightSearchForm />
      </div>
    </div>
  );
}
