import type { Traveler } from "../interfaces/Booking";
import type { TravelerPricing } from "../interfaces/ConfirmedFlightOffer";

export const createTravelersFromPricing = (
  travelerPricings: TravelerPricing[]
): Traveler[] => {
  return travelerPricings.map((tp, index) => ({
    id: tp.travelerId || String(index + 1),
    type: tp.travelerType as "ADULT" | "CHILD" | "INFANT",
    name: { firstName: "", lastName: "" },
    dateOfBirth: "",
    gender: "FEMALE",
    contact: {
      phones: [
        {
          deviceType: "",
          countryCallingCode: "+263",
          number: "",
        },
      ],
      emailAddress: "",
    },
    documents: [
      {
        documentType: "PASSPORT",
        birthPlace: "",
        issuanceLocation: "",
        issuanceDate: "",
        number: "",
        expiryDate: "",
        issuanceCountry: "",
        validityCountry: "",
        nationality: "",
        holder: true,
      },
    ],
  }));
};
