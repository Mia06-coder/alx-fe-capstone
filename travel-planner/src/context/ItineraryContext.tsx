import { createContext, useState, useEffect, type ReactNode } from "react";

export type ItineraryItemType = "flight" | "hotel" | "activity";

export interface ItineraryItem {
  id: string; // flightOfferId, hotelId, or activityId
  type: ItineraryItemType;
  data: any; // store full API object or simplified
}

interface ItineraryContextProps {
  items: ItineraryItem[];
  addItem: (item: ItineraryItem) => void;
  removeItem: (id: string) => void;
  clearItinerary: () => void;
}

const ItineraryContext = createContext<ItineraryContextProps | undefined>(
  undefined
);

export default ItineraryContext;

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItineraryItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("itinerary");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (err) {
      console.error("Failed to parse itinerary:", err);
    }
  }, []);

  useEffect(() => {
    // Only save if items is not empty
    if (items.length > 0) {
      localStorage.setItem("itinerary", JSON.stringify(items));
    }
  }, [items]);
  const addItem = (item: ItineraryItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id && i.type === item.type)) {
        return prev; // Already exists
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearItinerary = () => {
    setItems([]);
  };

  return (
    <ItineraryContext.Provider
      value={{ items, addItem, removeItem, clearItinerary }}
    >
      {children}
    </ItineraryContext.Provider>
  );
}
