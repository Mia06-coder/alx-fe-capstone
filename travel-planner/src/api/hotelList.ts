// src/api/hotelList.ts
import { api } from "./client";

export async function getHotels(latitude: number, longitude: number) {
  const res = await api.get("/hotel-list", {
    params: { latitude, longitude },
  });
  return res.data;
}
