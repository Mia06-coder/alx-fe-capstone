// src/api/flightOffers.ts
import type { FlightOfferParams } from "../interfaces/FlightOffersParams";
import { api } from "./client";

export async function getFlightOffers(params: FlightOfferParams) {
  const res = await api.get("/flight-offers", { params });
  return res.data;
}
