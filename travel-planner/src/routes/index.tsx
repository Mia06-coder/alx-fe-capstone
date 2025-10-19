// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import Flights from "../pages/Flights";
import FlightsResults from "../pages/Flights/results";
import FlightBooking from "../pages/Flights/booking";
import FlightItinerary from "../pages/Flights/itinerary";
import Destination from "../pages/Attractions";
import HotelSearch from "../pages/Hotels";
import ItineraryPlanner from "../pages/ItineraryPlanner";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Flights />} />
    <Route path="/flights/results" element={<FlightsResults />} />
    <Route path="/flight/booking/:id" element={<FlightBooking />} />
    <Route path="/flight/itinerary/:id" element={<FlightItinerary />} />
    <Route path="/attractions" element={<Destination />} />
    <Route path="/hotels" element={<HotelSearch />} />
    <Route path="/itineraryplanner" element={<ItineraryPlanner />} />
  </Routes>
);

export default AppRoutes;
