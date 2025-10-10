// src/interfaces/FlightOfferParams.ts
export interface FlightOfferParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: number;
  returnDate?: string;
  children?: number;
  infants?: number;
  travelClass?: "ECONOMY" | "PREMIUM ECONOMY" | "BUSINESS" | "FIRST";
  nonStop?: boolean;
}
