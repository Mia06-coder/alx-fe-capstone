// src/utils/handleApiError.ts
import axios from "axios";

/**
 * Handles and logs API errors in a type-safe way.
 * Works for Vercel functions, Next.js API routes, or generic fetch handlers.
 */
export function handleApiError(err: unknown, context?: string): Response {
  const prefix = context ? `❌ ${context}:` : "❌ API Error:";
  if (axios.isAxiosError(err)) {
    console.error(prefix, err.response?.data || err.message);
    return new Response(
      JSON.stringify({
        error: err.response?.data || "API request failed",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (err instanceof Error) {
    console.error(prefix, err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.error(prefix, err);
  return new Response(JSON.stringify({ error: "An unknown error occurred" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
