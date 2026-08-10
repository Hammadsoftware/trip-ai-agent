export interface User {
  id: number | string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token?: string;
  user: User;
}

export interface Flight {
  id?: string;
  airline: string;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: number;
  price: number;
  departure_airport?: string;
  arrival_airport?: string;
  status?: string;
}

export interface Hotel {
  id?: string;
  hotel_name: string;
  star_rating: number;
  price_per_night: number;
  photo?: string;
  location?: string;
  amenities?: string[];
  room_info?: string;
}

export interface TripDay {
  day: number;
  flights?: Flight[];
  hotels?: Hotel[];
  activities?: string[];
}

export interface TripSummaryData {
  itinerary: TripDay[];
  total_price: number;
}

/* ── /ai endpoint response ─────────────────────────── */
export interface AiFlightResult {
  result: string;
  items: Flight[];
}

export interface AiHotelResult {
  result: string;
  items: Hotel[];
}

export interface AiResponseData {
  flights?: AiFlightResult;
  hotels?: AiHotelResult;
  itinerary?: TripDay[];
  trip_stats?: Record<string, unknown>;
  visualizations?: Record<string, unknown>;
}

export interface AiResponse {
  success: boolean;
  query: string;
  response: string;
  data: AiResponseData;
  meta: {
    llm_calls: number;
  };
}

/* ── Recent search (localStorage) ───────────────────── */
export interface RecentSearch {
  id: string;
  query: string;
  destination: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ConversationMessage[];
  createdAt: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}
