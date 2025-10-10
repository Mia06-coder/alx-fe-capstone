import { useContext } from "react";
import FlightContext from "../context/FlightContext";

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlight must be used within a FlightProvider");
  }
  return context;
};
