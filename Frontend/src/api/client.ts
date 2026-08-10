
import axios from "axios";
import { API_BASE_URL } from "../config";
import type { AiResponse } from "../types";

// =====================================================
// ERROR HANDLER
// =====================================================

export function normalizeError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const responseData = err.response?.data;

    // FastAPI 422:
    // {
    //   "detail": [
    //     {
    //       "type": "...",
    //       "loc": ["body", "query"],
    //       "msg": "Field required",
    //       "input": null
    //     }
    //   ]
    // }

    if (Array.isArray(responseData)) {
      const messages = responseData
        .filter(
          (item): item is { msg?: string } =>
            typeof item === "object" &&
            item !== null &&
            "msg" in item
        )
        .map((item) => item.msg || "Invalid input");

      if (messages.length > 0) {
        return messages.join("; ");
      }
    }

    // FastAPI:
    // { "detail": "Some error" }
    //
    // OR:
    // { "detail": [...] }

    if (
      typeof responseData === "object" &&
      responseData !== null &&
      "detail" in responseData
    ) {
      const detail = (
        responseData as { detail: unknown }
      ).detail;

      if (typeof detail === "string") {
        return detail;
      }

      if (Array.isArray(detail)) {
        const messages = detail
          .filter(
            (item): item is { msg?: string } =>
              typeof item === "object" &&
              item !== null &&
              "msg" in item
          )
          .map((item) => item.msg || "Invalid input");

        if (messages.length > 0) {
          return messages.join("; ");
        }
      }
    }

    // Plain string response
    if (typeof responseData === "string") {
      return responseData;
    }

    // HTTP status fallback
    if (err.response?.status === 401) {
      return "Unauthorized. Please log in again.";
    }

    if (err.response?.status === 404) {
      return "API endpoint not found.";
    }

    if (err.response?.status === 422) {
      return "Invalid travel request.";
    }

    if (err.response?.status && err.response.status >= 500) {
      return "Server error. Please try again later.";
    }

    return err.message || "Request failed.";
  }

  // Normal JavaScript Error
  if (err instanceof Error) {
    return err.message;
  }

  return "Something went wrong.";
}

// =====================================================
// AUTH TOKEN
// =====================================================

let token: string | null = null;

export function setApiToken(t: string | null) {
  token = t;
}

// =====================================================
// AXIOS INSTANCE
// =====================================================

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 120000,
});

// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      setApiToken(null);
    }

    return Promise.reject(error);
  }
);

// =====================================================
// AI TRIP PLANNING
// =====================================================

export async function postAiQuery(
  query: string
): Promise<AiResponse> {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    throw new Error("Please enter a travel request.");
  }

  const response = await api.post<AiResponse>(
    "/ai",
    {
      query: cleanQuery,
    }
  );

  return response.data;
}

// =====================================================
// EXPORT
// =====================================================

export default api;
