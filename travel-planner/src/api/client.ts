// src/api/client.ts
import axios from "axios";
import { getAccessToken } from "./auth";

const token = await getAccessToken();

// Create a reusable axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_AMADEUS_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
