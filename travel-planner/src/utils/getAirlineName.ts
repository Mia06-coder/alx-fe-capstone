import { airlines } from "../data/airlines";

export const getAirlineName = (iataCode: string): string =>
  airlines[iataCode] || "";
