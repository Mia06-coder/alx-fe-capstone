// api/token.ts
import axios from "axios";
import { handleApiError } from "../src/utils/handleApiError";

let cachedToken: string | null = null;
let tokenExpiry: 0;

export async function getAmadeusToken() {
  const now = Date.now();
  console.log("🔍 Loaded env:", {
    clientId: process.env.AMADEUS_API_KEY ? "✅ set" : "❌ missing",
    clientSecret: process.env.AMADEUS_API_SECRET ? "✅ set" : "❌ missing",
    baseUrl: process.env.AMADEUS_API_BASE_URL,
  });

  // if token still valid, return it
  if (cachedToken && now < tokenExpiry) return cachedToken;

  try {
    const key = process.env.AMADEUS_API_KEY;
    const secret = process.env.AMADEUS_API_SECRET;

    if (!key || !secret) {
      throw new Error(
        "❌ Missing Amadeus credentials in environment variables"
      );
    }

    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: key,
        client_secret: secret,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    cachedToken = response.data.access_token;
    tokenExpiry = now + response.data.expires_in * 1000;

    return cachedToken;
  } catch (err) {
    handleApiError(err, "Token API Error");
  }
}
