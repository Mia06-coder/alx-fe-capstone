// src/api/airportLocations.ts
import { api } from "./client";

export async function fetchAirports(keyword: string) {
  const res = await api.get("/airport-locations", { params: { keyword } });
  return res.data;
}
