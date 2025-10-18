// src/api/cityLocations.ts
import { api } from "./client";

export async function getLocations(keyword: string) {
  const res = await api.get("/city-locations", { params: { keyword } });
  return res.data;
}
