// In dev mode, use relative paths so the Vite proxy forwards to the backend (avoids CORS).
// In production, the app and API are served from the same origin, so relative paths also work.
// The explicit URL is kept as a fallback for any non-standard deployment.
export const API_BASE_URL = import.meta.env.DEV
  ? ""
  : "https://ai-travel-agent-1-qoo0.onrender.com/";
