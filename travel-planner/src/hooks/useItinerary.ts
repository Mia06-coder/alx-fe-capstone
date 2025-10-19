import { useContext } from "react";
import ItineraryContext from "../context/ItineraryContext";

// Hook for easy usage
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context)
    throw new Error("useItinerary must be used within an ItineraryProvider");
  return context;
};
