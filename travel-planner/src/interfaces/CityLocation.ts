// src/interfaces/CityLocation.ts
export interface Location {
  type: string;
  subType: string;
  name: string;
  iataCode?: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    postalCode: string;
    countryCode: string;
    stateCode: string;
  };
}
