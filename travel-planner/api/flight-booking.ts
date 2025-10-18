// api/flight-booking.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { getAmadeusToken } from "./token";
import { handleApiError } from "../src/utils/handleApiError";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const token = await getAmadeusToken();
    console.log(`Req: ${req.body}`);

    const response = await axios.post(
      `${process.env.AMADEUS_API_BASE_URL}/booking/flight-orders`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    handleApiError(err, "Flight Booking Order");
  }
}
