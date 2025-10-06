import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flights from "../pages/Flights";
import FlightsResults from "../pages/Flights/results";
import FlightBooking from "../pages/Flights/booking";
import FlightItinerary from "../pages/Flights/itinerary";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Flights />} />
      <Route path="/flights/results" element={<FlightsResults />} />
      <Route path="/flight/booking" element={<FlightBooking />} />
      <Route path="/flight/itinerary" element={<FlightItinerary />} />
    </Routes>
  </Router>
);

export default AppRoutes;
