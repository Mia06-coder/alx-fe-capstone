import { airportNames } from "../data/airportNames";

export const getAirportName = (iataCode: string): string =>
  airportNames[iataCode] || "";
