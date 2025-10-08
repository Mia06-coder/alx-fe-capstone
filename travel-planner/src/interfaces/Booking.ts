// src/interfaces/Booking.ts

import type { FlightOffer } from "./ConfirmedFlightOffer";

export interface Traveler {
  id: string;
  type: "ADULT" | "CHILD" | "INFANT";
  name: { firstName: string; lastName: string };
  dateOfBirth: string;
  gender: "MALE" | "FEMALE";
  contact: { phones: Phone[]; emailAddress: string };
  documents: Document[];
}

export interface Document {
  documentType: "PASSPORT" | "ID";
  birthPlace: string;
  issuanceLocation: string;
  issuanceDate: string;
  number: string;
  expiryDate: string;
  issuanceCountry: string;
  validityCountry: string;
  nationality: string;
  holder: boolean;
}

export interface FlightOrder {
  data: {
    type: "flight-order";
    flightOffers: FlightOffer[]; // from your selected offer
    travelers: Traveler[];
    remarks?: {
      general: { subType: string; text: string }[];
    };
    ticketingAgreement?: {
      option: string;
      delay: string;
    };
    contacts?: Contact[];
  };
}

export interface Contact {
  addresseName: { firstName: string; lastName: string };
  companyName: string;
  purpose: string;
  phones: Phone[];
  emailAddress: string;
  address: Address;
}

export interface Phone {
  deviceType: string;
  countryCallingCode: string;
  number: string;
}

export interface Address {
  lines: string[];
  postalCode: string;
  cityName: string;
  countryCode: string;
}
