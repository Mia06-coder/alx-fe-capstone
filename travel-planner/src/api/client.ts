// src/api/client.ts
import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api" // when running locally with Vercel dev
      : "/api", // Vercel will resolve this automatically,
});
