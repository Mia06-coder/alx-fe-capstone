// src/api/auth.ts
import axios from "axios";

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_AMADEUS_API_TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_AMADEUS_API_KEY,
        client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to retrieve access token");
  }
};
