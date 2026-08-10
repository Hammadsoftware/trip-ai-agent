import { useState, useRef, useEffect } from "react";
import api from "../../api/client";
import type { ChatMessage, ChatResponse } from "../../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import FlightCard from "../cards/FlightCard";
import HotelCard from "../cards/HotelCard";
import TripSummary from "../cards/TripSummary";

interface Props {
  conversationId: string;
  conversationTitle: string;
}

export default function ChatPanel({ conversationId, conversationTitle }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages([]);
  }, [conversationId]);

  const addMessage = (msg: Omit<ChatMessage, "id">) => {
    const id = crypto.randomUUID();
    setMessages((prev) => [...prev, { ...msg, id }]);
    return id;
  };

  const handleSend = async (text: string) => {
    addMessage({ role: "user", content: text });

    setIsLoading(true);

    try {
      const { data } = await api.post<ChatResponse>("/chat", {
        message: text,
        conversation_id: conversationId,
      });

      addMessage({
        role: "assistant",
        content: data.reply_text,
        intent: data.intent,
        data: data.data,
      });
    } catch {
      addMessage({
        role: "assistant",
        content: "Something went wrong — please try again.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectItem = async (itemType: "flight" | "hotel", itemId: string, name: string, price: string) => {
    try {
      await api.post("/trip/select-item", {
        conversation_id: conversationId,
        item_type: itemType,
        item_id: itemId,
      });
      addMessage({
        role: "assistant",
        content: `Added: ${name} — $${price}`,
      });
    } catch {
      addMessage({
        role: "assistant",
        content: "Something went wrong — please try again.",
        isError: true,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <h2 className="text-lg font-semibold text-text-light dark:text-text-dark truncate">
          {conversationTitle}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-text-light/40 dark:text-text-dark/40">
              Start a conversation — ask about flights, hotels, or trip ideas.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id}>
            <MessageBubble message={msg} />

            {msg.role === "assistant" && !msg.isError && (
              <>
                {msg.intent === "flight_search" && msg.data?.flights && (
                  <div className="mt-3 space-y-3 pl-0 max-w-[85%]">
                    {msg.data.flights.map((flight, i) => (
                      <FlightCard
                        key={flight.id ?? i}
                        flight={flight}
                        onSelect={() =>
                          handleSelectItem(
                            "flight",
                            flight.id ?? `${flight.airline}-${flight.flight_number}`,
                            `${flight.airline} ${flight.flight_number}`,
                            flight.price.toString()
                          )
                        }
                      />
                    ))}
                  </div>
                )}

                {msg.intent === "hotel_search" && msg.data?.hotels && (
                  <div className="mt-3 space-y-3 pl-0 max-w-[85%]">
                    {msg.data.hotels.map((hotel, i) => (
                      <HotelCard
                        key={hotel.id ?? i}
                        hotel={hotel}
                        onSelect={() =>
                          handleSelectItem(
                            "hotel",
                            hotel.id ?? hotel.hotel_name,
                            hotel.hotel_name,
                            hotel.price_per_night.toString()
                          )
                        }
                      />
                    ))}
                  </div>
                )}

                {msg.intent === "trip_summary" && msg.data?.itinerary && (
                  <div className="mt-3 pl-0 max-w-[95%]">
                    <TripSummary
                      itinerary={msg.data.itinerary}
                      totalPrice={msg.data.total_price ?? 0}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
