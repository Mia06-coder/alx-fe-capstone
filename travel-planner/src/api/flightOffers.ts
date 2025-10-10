// src/api/flightOffers.ts
import type { AxiosError } from "axios";
import type { FlightOfferParams } from "../interfaces/FlightOffersParams";
import { api } from "./client";

/**
 * Fetches available flight offers based on search parameters.
 * Handles both required and optional parameters gracefully.
 *
 * Includes detailed logging for debugging:
 * - Network errors
 * - Invalid credentials (401)
 * - Missing/invalid parameters (400)
 * - Server errors (5xx)
 *
 * @param {FlightOfferParams} params - The flight search parameters
 * @returns {Promise<any>} The API response data (flight offers)
 */

export const getFlightOffers = async (params: FlightOfferParams) => {
  try {
    const response = await api.get("/shopping/flight-offers", {
      params,
    });
    if (!response.data || response.data.length === 0) {
      console.warn("No flight offers found for the provided search criteria.");
      return [];
    }
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<{
      message?: string;
      errors?: { detail?: string }[];
    }>;
    console.error("Error fetching flight offers:", err);

    // Handle Axios-specific errors (has response, request, or message)
    if (axiosErr.response) {
      const { status, data } = axiosErr.response;

      // Log the specific HTTP error category
      switch (status) {
        case 400:
          console.error("🟥 Bad Request: Check your parameters.", data);
          break;
        case 401:
          console.error(
            "🔒 Unauthorized: Invalid or expired API key/secret.",
            data
          );
          break;
        case 403:
          console.error("🚫 Forbidden: Access denied for this resource.", data);
          break;
        case 404:
          console.error("🔍 Not Found: Endpoint or data unavailable.", data);
          break;
        case 429:
          console.error("⏱️ Too Many Requests: Rate limit exceeded.", data);
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          console.error("💥 Server Error: Try again later.", data);
          break;
        default:
          console.error(`⚠️ Unhandled HTTP Error (${status}):`, data);
      }

      const message =
        data?.errors?.[0]?.detail ||
        data?.message ||
        `Request failed with status ${status}`;

      throw new Error(message);
    } else if (axiosErr.request) {
      console.error(
        "🌐 Network Error: No response received from API.",
        axiosErr.request
      );
      throw new Error("Network error: No response from server.");
    } else {
      console.error("❗ Unexpected Error:", axiosErr.message);
      throw new Error(axiosErr.message || "Unexpected error occurred.");
    }
  }
};
