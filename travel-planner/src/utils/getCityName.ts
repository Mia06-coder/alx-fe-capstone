// src/utils/getCityName.ts
import { airportCities } from "../data/airportCities";

export const getCityName = (code: string): string => {
  return airportCities[code] || "";
};
