// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import Flights from "../pages/Flights";
import FlightsResults from "../pages/Flights/results";
import FlightBooking from "../pages/Flights/booking";
import FlightItinerary from "../pages/Flights/itinerary";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Flights />} />
    <Route path="/flights/results" element={<FlightsResults />} />
    <Route path="/flight/booking/:id" element={<FlightBooking />} />
    <Route path="/flight/itinerary/:id" element={<FlightItinerary />} />
  </Routes>
);

export default AppRoutes;
