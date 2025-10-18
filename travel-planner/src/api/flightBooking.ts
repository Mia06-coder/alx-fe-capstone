// src/api/flightBooking.ts
import type { FlightOrder } from "../interfaces/Booking";
import { api } from "./client";

export async function bookFlight(order: FlightOrder) {
  const res = await api.post("/flight-booking", order);
  return res.data.data;
}
