// src/api/flightConfirmation.ts
import { api } from "./client";

export async function getConfirmedFlight(flightOffer: object) {
  const payload = {
    data: {
      type: "flight-offers-pricing",
      flightOffers: [flightOffer],
    },
  };

  console.log(`Payload: ${payload.data.flightOffers}`);

  const res = await api.post("/flight-confirmation", payload);
  return res.data.data;
}
