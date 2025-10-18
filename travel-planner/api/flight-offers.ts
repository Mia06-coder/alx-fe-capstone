// api/flight-offers.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { getAmadeusToken } from "./token";
import { handleApiError } from "../src/utils/handleApiError";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const token = await getAmadeusToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        params: { ...req.query, max: 50 },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    handleApiError(err, "Flight Offers Error");
  }
}
