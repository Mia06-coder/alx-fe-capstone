// src/interfaces/Hotel.ts
export interface Address {
  lines: string[];
  postalCode?: string;
  cityName?: string;
  countryCode?: string;
  stateCode?: string;
}

export interface GeoCode {
  latitude: number;
  longitude: number;
}

export interface Distance {
  value: number; // distance in units
  unit: string; // example: "KM", "MI"
}

export interface Hotel {
  subtype: string; // e.g. "airport", "hotel", "restaurant"
  name: string; // e.g. "Hotel de Paris"
  timeZoneName: string; // e.g. "Europe/Paris"
  iataCode: string; // e.g. "PAR"
  address: Address;
  geoCode: GeoCode;
  hotelId: string; // e.g. "ADPAR001"
  chainCode: string; // e.g. "AD"
  distance?: Distance;
  masterChainCode?: string;
  last_update: string; // ISO date string
}
