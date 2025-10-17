// src/interfaces/ConfirmedFlightOffer.ts
export interface ConfirmedFlightOfferResponse {
  data: ConfirmedFlightOfferData;
  dictionaries: Dictionaries;
}

export interface ConfirmedFlightOfferData {
  type: string;
  flightOffers: FlightOffer[];
  bookingRequirements: {
    emailAddressRequired: boolean;
    mobilePhoneNumberRequired: boolean;
  };
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  lastTicketingDate: string;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
  paymentCardRequired: boolean;
}

export interface Itinerary {
  segments: Segment[];
}

export interface Segment {
  departure: LocationDetails;
  arrival: LocationDetails;
  carrierCode: string;
  number: string;
  aircraft: Aircraft;
  operating: Operating;
  id: string;
  numberOfStops: number;
  duration: string;
}

export interface LocationDetails {
  iataCode: string;
  at: string;
  terminal?: string;
}

export interface Aircraft {
  code: string;
}

export interface Operating {
  carrierCode: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
  billingCurrency: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: TravelerPrice;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface TravelerPrice {
  currency: string;
  total: string;
  base: string;
  taxes: Tax[];
  refundableTaxes: string;
}

export interface Tax {
  amount: string;
  code: string;
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: CheckedBags;
}

export interface CheckedBags {
  quantity: number;
}

export interface Dictionaries {
  locations: Record<string, LocationDictionary>;
}

export interface LocationDictionary {
  cityCode: string;
  countryCode: string;
}
