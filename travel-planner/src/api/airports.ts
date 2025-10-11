import { api } from "./client";

const API_URL = "https://test.api.amadeus.com/v1/reference-data/locations";

export async function fetchAirports(keyword: string) {
  try {
    const res = await api.get(API_URL, {
      params: {
        subType: "AIRPORT,CITY",
        keyword,
        sort: "analytics.travelers.score",
        view: "LIGHT",
      },
    });

    return res.data.data;
  } catch (error) {
    console.error("❌ Error fetching airports:", error);
    return [];
  }
}
