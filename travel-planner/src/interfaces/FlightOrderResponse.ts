// src/interfaces/FlightOrderResponse.ts

import type { TravelerPricing } from "./ConfirmedFlightOffer";

export interface FlightOrderResponse {
  type: "flight-order";
  id: string;
  queuingOfficeId: string;
  associatedRecords: AssociatedRecord[];
  flightOffers: FlightOffer[];
  travelers: Traveler[];
  remarks?: {
    general: { subType: string; text: string }[];
  };
  ticketingAgreement?: {
    option: string;
    delay: string;
  };
  automatedProcess?: {
    code: string;
    queue: { number: string; category: string };
    officeId: string;
  }[];
  contacts?: Contact[];
}

export interface AssociatedRecord {
  reference: string;
  creationDate: string;
  originSystemCode: string;
  flightOfferId: string;
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  lastTicketingDate: string;
  itineraries: Itinerary[];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: { amount: string; type: string }[];
    grandTotal: string;
    billingCurrency: string;
  };
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  segments: Segment[];
}

export interface Segment {
  departure: { iataCode: string; terminal?: string; at: string };
  arrival: { iataCode: string; terminal?: string; at: string };
  carrierCode: string;
  number: string;
  aircraft: { code: string };
  duration: string;
  id: string;
  numberOfStops: number;
  co2Emissions: {
    weight: number;
    weightUnit: string;
    cabin: string;
  }[];
}

export interface Traveler {
  id: string;
  dateOfBirth: string;
  gender: string;
  name: { firstName: string; lastName: string };
  documents: Document[];
  contact: Contact;
}

export interface Document {
  number: string;
  issuanceDate: string;
  expiryDate: string;
  issuanceCountry: string;
  issuanceLocation: string;
  nationality: string;
  documentType: string;
  holder: boolean;
}

export interface Contact {
  purpose: string;
  addresseeName?: { firstName: string };
  address?: {
    lines: string[];
    postalCode: string;
    countryCode: string;
    cityName: string;
  };
  phones?: {
    deviceType: string;
    countryCallingCode: string;
    number: string;
  }[];
  companyName?: string;
  emailAddress?: string;
}
