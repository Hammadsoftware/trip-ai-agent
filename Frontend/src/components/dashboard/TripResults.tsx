
import { useEffect, useState } from "react";
import type { TripDay } from "../../types";
import {
  Plane,
  Building2,
  CalendarDays,
  X,
  Sparkles,
  MapPin,
  Star,
  Clock,
  ExternalLink,
  DollarSign,
} from "lucide-react";

interface Props {
  data: any;
  response: string;
  onClose: () => void;
}

// =====================================================
// SAFE HELPERS
// =====================================================

function safeArray<T = any>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

function safeObject(
  value: unknown
): Record<string, unknown> {
  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  ) {
    return value as Record<string, unknown>;
  }

  return {};
}

function safeString(
  value: unknown,
  fallback = ""
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  return String(value);
}

function safeNumber(
  value: unknown,
  fallback = 0
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function formatPrice(value: unknown): string {
  const number = safeNumber(value, 0);

  return number.toLocaleString();
}

function formatDateTime(value: unknown): string {
  if (!value) return "—";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// =====================================================
// AI RESPONSE
// =====================================================

function AIResponse({
  text,
}: {
  text: string;
}) {
  const [displayedText, setDisplayedText] =
    useState("");

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    setDisplayedText("");

    let index = 0;

    const interval = window.setInterval(() => {
      index += 3;

      setDisplayedText(
        text.slice(0, index)
      );

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 10);

    return () => {
      window.clearInterval(interval);
    };
  }, [text]);

  const isTyping =
    displayedText.length < text.length;

  const renderContent = () => {
    const lines =
      displayedText.split("\n");

    const elements: React.ReactNode[] = [];

    let bulletItems: string[] = [];

    const flushBullets = () => {
      if (bulletItems.length === 0) {
        return;
      }

      elements.push(
        <ul
          key={`bullets-${elements.length}`}
          className="my-4 space-y-2 pl-5 list-disc marker:text-accent"
        >
          {bulletItems.map(
            (item, index) => (
              <li
                key={index}
                className="pl-1 leading-7 text-text-light/80 dark:text-text-dark/80"
              >
                {formatInlineText(item)}
              </li>
            )
          )}
        </ul>
      );

      bulletItems = [];
    };

    lines.forEach(
      (rawLine, index) => {
        const line = rawLine.trim();

        // Empty line
        if (!line) {
          flushBullets();

          elements.push(
            <div
              key={`space-${index}`}
              className="h-2"
            />
          );

          return;
        }

        // H3
        if (line.startsWith("### ")) {
          flushBullets();

          elements.push(
            <h4
              key={`heading-${index}`}
              className="mt-7 mb-3 text-base font-bold text-text-light dark:text-text-dark"
            >
              {formatInlineText(
                line.replace(
                  /^###\s+/,
                  ""
                )
              )}
            </h4>
          );

          return;
        }

        // H2
        if (line.startsWith("## ")) {
          flushBullets();

          elements.push(
            <h3
              key={`heading-${index}`}
              className="mt-8 mb-3 text-lg font-bold text-text-light dark:text-text-dark"
            >
              {formatInlineText(
                line.replace(
                  /^##\s+/,
                  ""
                )
              )}
            </h3>
          );

          return;
        }

        // H1
        if (line.startsWith("# ")) {
          flushBullets();

          elements.push(
            <h2
              key={`heading-${index}`}
              className="mt-8 mb-4 text-xl font-bold text-text-light dark:text-text-dark"
            >
              {formatInlineText(
                line.replace(
                  /^#\s+/,
                  ""
                )
              )}
            </h2>
          );

          return;
        }

        // Numbered heading with bold
        if (
          /^\d+\.\s+\*\*.+\*\*/.test(
            line
          )
        ) {
          flushBullets();

          const cleaned = line
            .replace(
              /^\d+\.\s+/,
              ""
            )
            .replace(
              /\*\*/g,
              ""
            );

          elements.push(
            <h3
              key={`number-heading-${index}`}
              className="mt-7 mb-3 text-base font-bold text-text-light dark:text-text-dark"
            >
              {cleaned}
            </h3>
          );

          return;
        }

        // Bullet
        if (
          line.startsWith("- ") ||
          line.startsWith("* ") ||
          line.startsWith("• ")
        ) {
          bulletItems.push(
            line.replace(
              /^[-*•]\s+/,
              ""
            )
          );

          return;
        }

        // Numbered list
        if (/^\d+\.\s+/.test(line)) {
          flushBullets();

          const number =
            line.match(
              /^\d+/
            )?.[0];

          const cleaned =
            line.replace(
              /^\d+\.\s+/,
              ""
            );

          elements.push(
            <div
              key={`number-${index}`}
              className="flex gap-3 my-3"
            >
              <span className="font-semibold text-accent shrink-0">
                {number}.
              </span>

              <p className="flex-1 leading-7 text-text-light/80 dark:text-text-dark/80">
                {formatInlineText(
                  cleaned
                )}
              </p>
            </div>
          );

          return;
        }

        // Normal paragraph
        flushBullets();

        elements.push(
          <p
            key={`paragraph-${index}`}
            className="leading-7 text-text-light/80 dark:text-text-dark/80"
          >
            {formatInlineText(line)}
          </p>
        );
      }
    );

    flushBullets();

    return elements;
  };

  return (
    <section className="rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border-light dark:border-border-dark">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">
              TripAI
            </h3>

            <p className="text-xs text-text-light/45 dark:text-text-dark/45 mt-0.5">
              Your personalized travel assistant
            </p>
          </div>

          {isTyping && (
            <div className="ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />

              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:150ms]" />

              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:300ms]" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="max-w-4xl">
          {renderContent()}

          {isTyping && (
            <span className="inline-block w-1.5 h-5 ml-1 bg-accent animate-pulse align-middle" />
          )}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// INLINE MARKDOWN
// =====================================================

function formatInlineText(
  text: string
): React.ReactNode {
  const parts = text.split(
    /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g
  );

  return parts.map(
    (part, index) => {
      // Bold
      if (
        part.startsWith("**") &&
        part.endsWith("**")
      ) {
        return (
          <strong key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Italic
      if (
        part.startsWith("*") &&
        part.endsWith("*") &&
        !part.startsWith("**")
      ) {
        return (
          <em key={index}>
            {part.slice(1, -1)}
          </em>
        );
      }

      // Code
      if (
        part.startsWith("`") &&
        part.endsWith("`")
      ) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded bg-bg-light dark:bg-bg-dark text-accent text-xs"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    }
  );
}

// =====================================================
// SECTION HEADER
// =====================================================

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="px-5 py-4 border-b border-border-light dark:border-border-dark flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">
          {title}
        </h3>

        {subtitle && (
          <p className="text-xs text-text-light/45 dark:text-text-dark/45 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// =====================================================
// FLIGHT CARD
// NO SELECT BUTTON
// =====================================================

function FlightResultCard({
  flight,
}: {
  flight: any;
}) {
  const airline = safeString(
    flight?.airline,
    "Unknown Airline"
  );

  const flightNumber =
    safeString(
      flight?.flight_number
    );

  const departureAirport =
    safeString(
      flight?.departure_airport ||
        flight?.departure ||
        flight?.origin,
      "Departure"
    );

  const arrivalAirport =
    safeString(
      flight?.arrival_airport ||
        flight?.arrival ||
        flight?.destination,
      "Arrival"
    );

  const departureTime =
    flight?.departure_time;

  const arrivalTime =
    flight?.arrival_time;

  const price =
    flight?.price ??
    flight?.estimated_price;

  const duration =
    flight?.duration;

  const stops =
    flight?.stops ??
    flight?.stop;

  return (
    <div className="rounded-xl border border-border-light dark:border-border-dark p-4">
      <div className="flex items-start gap-4">
        {/* Airline */}
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Plane className="w-5 h-5 text-accent" />
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-text-light dark:text-text-dark">
              {airline}
            </p>

            {flightNumber && (
              <span className="text-xs text-text-light/45 dark:text-text-dark/45">
                {flightNumber}
              </span>
            )}
          </div>

          {/* Route */}
          <div className="flex items-center gap-3 mt-3">
            <div>
              <p className="text-xs font-medium text-text-light dark:text-text-dark">
                {departureAirport}
              </p>

              {departureTime && (
                <p className="text-xs text-text-light/50 dark:text-text-dark/50 mt-1">
                  {formatDateTime(
                    departureTime
                  )}
                </p>
              )}
            </div>

            <div className="flex-1 flex items-center gap-2">
              <div className="h-px flex-1 bg-border-light dark:bg-border-dark" />

              <Plane className="w-3.5 h-3.5 text-accent rotate-90" />

              <div className="h-px flex-1 bg-border-light dark:bg-border-dark" />
            </div>

            <div className="text-right">
              <p className="text-xs font-medium text-text-light dark:text-text-dark">
                {arrivalAirport}
              </p>

              {arrivalTime && (
                <p className="text-xs text-text-light/50 dark:text-text-dark/50 mt-1">
                  {formatDateTime(
                    arrivalTime
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Meta */}
          {(duration ||
            stops !== undefined) && (
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-text-light/45 dark:text-text-dark/45">
              {duration && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {duration}
                </span>
              )}

              {stops !== undefined && (
                <span>
                  {String(stops)}{" "}
                  {String(stops) === "1"
                    ? "stop"
                    : "stops"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price */}
        {price !== undefined &&
          price !== null && (
            <div className="text-right shrink-0">
              <p className="text-base font-bold text-text-light dark:text-text-dark">
                $
                {formatPrice(price)}
              </p>

              <p className="text-[11px] text-text-light/45 dark:text-text-dark/45 mt-0.5">
                estimated
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

// =====================================================
// HOTEL CARD
// SHOW BOOKING LINK FROM BACKEND
// =====================================================

function HotelResultCard({
  hotel,
}: {
  hotel: any;
}) {
  const hotelName =
    safeString(
      hotel?.hotel_name ||
        hotel?.name ||
        hotel?.hotel,
      "Hotel"
    );

  const area =
    safeString(
      hotel?.area ||
        hotel?.location ||
        hotel?.city
    );

  const category =
    safeString(
      hotel?.category ||
        hotel?.type
    );

  const rating = safeNumber(
    hotel?.rating ??
      hotel?.star_rating ??
      hotel?.stars,
    0
  );

  const price =
    hotel?.price_per_night ??
    hotel?.price ??
    hotel?.nightly_price;

  // ===================================================
  // HOTEL URL FROM BACKEND
  // Supports multiple possible field names
  // ===================================================

  const bookingLink =
    safeString(
      hotel?.booking_link ||
        hotel?.booking_url ||
        hotel?.hotel_url ||
        hotel?.hotel_link ||
        hotel?.url ||
        hotel?.link ||
        hotel?.website ||
        hotel?.website_url
    );

  const safeRating = Math.min(
    5,
    Math.max(0, rating)
  );

  return (
    <div className="rounded-xl border border-border-light dark:border-border-dark p-4 hover:border-accent/30 transition-colors">
      <div className="flex items-start gap-4">
        {/* Hotel Icon */}
        <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5 text-accent" />
        </div>

        {/* Hotel Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-text-light dark:text-text-dark">
              {hotelName}
            </h4>

            {category && (
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-medium">
                {category}
              </span>
            )}
          </div>

          {/* Area */}
          {area && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-text-light/55 dark:text-text-dark/55">
              <MapPin className="w-3.5 h-3.5 shrink-0" />

              <span>
                {area}
              </span>
            </div>
          )}

          {/* Rating */}
          {safeRating > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {Array.from({
                  length: 5,
                }).map(
                  (_, index) => (
                    <Star
                      key={index}
                      className={`w-3.5 h-3.5 ${
                        index <
                        Math.round(
                          safeRating
                        )
                          ? "fill-current text-amber-500"
                          : "text-text-light/20 dark:text-text-dark/20"
                      }`}
                    />
                  )
                )}
              </div>

              <span className="text-xs text-text-light/50 dark:text-text-dark/50">
                {safeRating.toFixed(
                  1
                )}
              </span>
            </div>
          )}

          {/* =================================================
              HOTEL BOOKING LINK
              ================================================= */}

          {bookingLink && (
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-accent text-white text-xs font-medium hover:opacity-90 transition-opacity"
            >
              View Hotel
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Price */}
        {price !== undefined &&
          price !== null && (
            <div className="text-right shrink-0">
              <div className="flex items-center justify-end">
                <DollarSign className="w-3.5 h-3.5 text-text-light dark:text-text-dark" />

                <p className="text-base font-bold text-text-light dark:text-text-dark">
                  {formatPrice(price)}
                </p>
              </div>

              <p className="text-[11px] text-text-light/45 dark:text-text-dark/45 mt-0.5">
                / night
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

// =====================================================
// STATS
// =====================================================

function StatsSection({
  stats,
}: {
  stats: Record<string, unknown>;
}) {
  const entries =
    Object.entries(stats).filter(
      ([, value]) =>
        typeof value ===
          "number" ||
        typeof value ===
          "string"
    );

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
      <SectionHeader
        icon={
          <CalendarDays className="w-4 h-4 text-accent" />
        }
        title="Trip Overview"
        subtitle="Quick trip statistics"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5">
        {entries.map(
          ([key, value]) => (
            <div
              key={key}
              className="rounded-xl border border-border-light dark:border-border-dark bg-bg-light/40 dark:bg-bg-dark/40 p-4"
            >
              <p className="text-xl font-bold text-text-light dark:text-text-dark">
                {typeof value ===
                "number"
                  ? value.toLocaleString()
                  : String(value)}
              </p>

              <p className="text-xs text-text-light/50 dark:text-text-dark/50 mt-1 capitalize">
                {key.replace(
                  /_/g,
                  " "
                )}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

// =====================================================
// MAIN TRIP RESULTS
// =====================================================

export default function TripResults({
  data,
  response,
  onClose,
}: Props) {
  const flights = safeArray(
    data?.flights?.items
  );

  const hotels = safeArray(
    data?.hotels?.items
  );

  const itinerary =
    safeArray<TripDay>(
      data?.itinerary
    );

  const tripStats =
    safeObject(
      data?.trip_stats
    );

  const hasAnyResults =
    flights.length > 0 ||
    hotels.length > 0 ||
    itinerary.length > 0 ||
    Object.keys(
      tripStats
    ).length > 0;

  return (
    <div className="space-y-5">
      {/* ================================================= */}
      {/* AI RESPONSE */}
      {/* ================================================= */}

      {response && (
        <AIResponse
          text={response}
        />
      )}

      {/* ================================================= */}
      {/* FLIGHTS */}
      {/* ================================================= */}

      {flights.length > 0 && (
        <section className="rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
          <SectionHeader
            icon={
              <Plane className="w-4 h-4 text-accent" />
            }
            title="Recommended Flights"
            subtitle={
              data?.flights
                ?.result
                ? String(
                    data.flights
                      .result
                  )
                : `${flights.length} flight${
                    flights.length !==
                    1
                      ? "s"
                      : ""
                  } found`
            }
          />

          <div className="p-4 space-y-3">
            {flights.map(
              (
                flight,
                index
              ) => (
                <FlightResultCard
                  key={
                    flight?.id ??
                    flight?.flight_number ??
                    index
                  }
                  flight={
                    flight
                  }
                />
              )
            )}
          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* HOTELS */}
      {/* ================================================= */}

      {hotels.length > 0 && (
        <section className="rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
          <SectionHeader
            icon={
              <Building2 className="w-4 h-4 text-accent" />
            }
            title="Recommended Hotels"
            subtitle={
              data?.hotels
                ?.result
                ? String(
                    data.hotels
                      .result
                  )
                : `${hotels.length} hotel${
                    hotels.length !==
                    1
                      ? "s"
                      : ""
                  } found`
            }
          />

          <div className="p-4 space-y-3">
            {hotels.map(
              (
                hotel,
                index
              ) => (
                <HotelResultCard
                  key={
                    hotel?.id ??
                    hotel?.hotel_name ??
                    hotel?.name ??
                    index
                  }
                  hotel={
                    hotel
                  }
                />
              )
            )}
          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* ITINERARY */}
      {/* ================================================= */}

      {itinerary.length > 0 && (
        <section className="rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
          <SectionHeader
            icon={
              <CalendarDays className="w-4 h-4 text-accent" />
            }
            title="Day-by-Day Itinerary"
            subtitle="Your complete travel plan"
          />

          <TravelTimeline
            itinerary={
              itinerary
            }
          />
        </section>
      )}

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      {Object.keys(
        tripStats
      ).length > 0 && (
        <StatsSection
          stats={
            tripStats
          }
        />
      )}

      {/* ================================================= */}
      {/* EMPTY */}
      {/* ================================================= */}

      {!hasAnyResults &&
        !response && (
          <section className="rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
            <div className="text-center py-12">
              <p className="text-sm text-text-light/40 dark:text-text-dark/40">
                No trip data returned yet.
              </p>
            </div>
          </section>
        )}

      {/* ================================================= */}
      {/* CLOSE */}
      {/* ================================================= */}

      <div className="flex justify-end pt-2">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-sm text-text-light dark:text-text-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors"
        >
          <X className="w-4 h-4" />
          Close Results
        </button>
      </div>
    </div>
  );
}

// =====================================================
// TRAVEL TIMELINE
// =====================================================

function TravelTimeline({
  itinerary,
}: {
  itinerary: TripDay[];
}) {
  const safeItinerary =
    Array.isArray(
      itinerary
    )
      ? itinerary
      : [];

  const totalPrice =
    safeItinerary.reduce(
      (total, day) => {
        if (
          !day ||
          typeof day !==
            "object"
        ) {
          return total;
        }

        const flightPrices =
          Array.isArray(
            day.flights
          )
            ? day.flights.reduce(
                (
                  sum,
                  flight
                ) => {
                  const price =
                    safeNumber(
                      flight?.price,
                      0
                    );

                  return (
                    sum + price
                  );
                },
                0
              )
            : 0;

        const hotelPrices =
          Array.isArray(
            day.hotels
          )
            ? day.hotels.reduce(
                (
                  sum,
                  hotel
                ) => {
                  const price =
                    safeNumber(
                      hotel?.price_per_night ??
                        hotel?.price,
                      0
                    );

                  return (
                    sum + price
                  );
                },
                0
              )
            : 0;

        return (
          total +
          flightPrices +
          hotelPrices
        );
      },
      0
    );

  return (
    <div className="p-5">
      {safeItinerary.map(
        (
          day,
          index
        ) => {
          if (
            !day ||
            typeof day !==
              "object"
          ) {
            return null;
          }

          const activities =
            Array.isArray(
              day.activities
            )
              ? day.activities
              : [];

          const dayFlights =
            Array.isArray(
              day.flights
            )
              ? day.flights
              : [];

          const dayHotels =
            Array.isArray(
              day.hotels
            )
              ? day.hotels
              : [];

          const hasDayContent =
            activities.length >
              0 ||
            dayFlights.length >
              0 ||
            dayHotels.length >
              0;

          return (
            <div
              key={
                day.day ??
                `day-${index}`
              }
              className="relative pl-9"
            >
              {/* Timeline line */}

              {index <
                safeItinerary.length -
                  1 && (
                <div className="absolute left-[7px] top-5 bottom-[-32px] w-px bg-border-light dark:bg-border-dark" />
              )}

              {/* Timeline dot */}

              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-accent border-4 border-surface-light dark:border-surface-dark ring-1 ring-accent/30" />

              {/* Day heading */}

              <div className="mb-4">
                <h4 className="text-base font-bold text-text-light dark:text-text-dark">
                  Day{" "}
                  {day.day ??
                    index + 1}
                </h4>

                {day.date && (
                  <p className="text-xs text-text-light/45 dark:text-text-dark/45 mt-1">
                    {String(
                      day.date
                    )}
                  </p>
                )}
              </div>

              {hasDayContent ? (
                <div className="space-y-4">
                  {/* Activities */}

                  {activities.length >
                    0 && (
                    <div className="space-y-2">
                      {activities.map(
                        (
                          activity,
                          activityIndex
                        ) => (
                          <div
                            key={
                              activityIndex
                            }
                            className="flex items-start gap-3"
                          >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />

                            <p className="text-sm leading-7 text-text-light/75 dark:text-text-dark/75">
                              {typeof activity ===
                              "string"
                                ? activity
                                : String(
                                    activity
                                  )}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Flights */}

                  {dayFlights.length >
                    0 && (
                    <div className="space-y-3">
                      {dayFlights.map(
                        (
                          flight,
                          flightIndex
                        ) => (
                          <FlightResultCard
                            key={`day-flight-${flightIndex}`}
                            flight={
                              flight
                            }
                          />
                        )
                      )}
                    </div>
                  )}

                  {/* Hotels */}

                  {dayHotels.length >
                    0 && (
                    <div className="space-y-3">
                      {dayHotels.map(
                        (
                          hotel,
                          hotelIndex
                        ) => (
                          <HotelResultCard
                            key={`day-hotel-${hotelIndex}`}
                            hotel={
                              hotel
                            }
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-text-light/40 dark:text-text-dark/40">
                  No activities
                  available
                  for this
                  day.
                </p>
              )}
            </div>
          );
        }
      )}

      {/* ================================================= */}
      {/* TOTAL */}
      {/* ================================================= */}

      {totalPrice > 0 && (
        <div className="mt-8 pt-5 border-t border-border-light dark:border-border-dark flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light/50 dark:text-text-dark/50">
              Estimated total
            </p>

            <p className="text-lg font-bold text-text-light dark:text-text-dark mt-1">
              $
              {totalPrice.toLocaleString()}
            </p>
          </div>

          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-accent" />
          </div>
        </div>
      )}
    </div>
  );
}
```

### What changed

The important part is this:

```tsx
const bookingLink = safeString(
  hotel?.booking_link ||
    hotel?.booking_url ||
    hotel?.hotel_url ||
    hotel?.hotel_link ||
    hotel?.url ||
    hotel?.link ||
    hotel?.website ||
    hotel?.website_url
);
```

And the button:

```tsx
{bookingLink && (
  <a
    href={bookingLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-accent text-white text-xs font-medium hover:opacity-90 transition-opacity"
  >
    View Hotel
    <ExternalLink className="w-3.5 h-3.5" />
  </a>
)}
```

So if your backend sends:

```json
{
  "hotel_name": "Hilton Dubai",
  "location": "Dubai",
  "rating": 4.5,
  "price_per_night": 150,
  "booking_link": "https://www.example.com/hotel"
}
```

the card will show a **View Hotel** button that opens the backend-provided link in a new tab.

If your backend **doesn't actually return a URL**, this frontend cannot create a real booking link by itself. In that case, send me your **FastAPI `hotel_agent` / hotel tool code**, and I can modify the backend to return the hotel URLs too.
