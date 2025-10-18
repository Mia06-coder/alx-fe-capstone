// src/api/cityActivities.ts
import { api } from "./client";

export async function getActivities(latitude: number, longitude: number) {
  const res = await api.get("/city-activities", {
    params: { latitude, longitude },
  });
  return res.data;
}
