import type { TripDay, Flight, Hotel } from "../../types";

interface Props {
  itinerary: TripDay[];
  totalPrice: number;
}

function FlightLine({ flight }: { flight: Flight }) {
  return (
    <div className="text-xs text-text-light/70 dark:text-text-dark/70 ml-2 flex items-center gap-2">
      <span className="font-medium">{flight.airline} {flight.flight_number}</span>
      <span>{flight.departure_time} → {flight.arrival_time}</span>
      <span>{flight.duration}</span>
    </div>
  );
}

function HotelLine({ hotel }: { hotel: Hotel }) {
  return (
    <div className="text-xs text-text-light/70 dark:text-text-dark/70 ml-2">
      <span className="font-medium">{hotel.hotel_name}</span>
      <span className="ml-2">{"★".repeat(hotel.star_rating)}</span>
    </div>
  );
}

export default function TripSummary({ itinerary, totalPrice }: Props) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
      <div className="px-5 py-3 border-b border-border-light dark:border-border-dark">
        <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">
          Trip Itinerary
        </h3>
      </div>
      <div className="divide-y divide-border-light dark:divide-border-dark">
        {itinerary.map((day) => (
          <div key={day.day} className="px-5 py-4">
            <p className="text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Day {day.day}
            </p>
            <div className="space-y-1.5">
              {day.flights?.map((flight, i) => (
                <FlightLine key={i} flight={flight} />
              ))}
              {day.hotels?.map((hotel, i) => (
                <HotelLine key={i} hotel={hotel} />
              ))}
              {day.activities?.map((activity, i) => (
                <p
                  key={i}
                  className="text-xs text-text-light/70 dark:text-text-dark/70 ml-2"
                >
                  • {activity}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark">
        <p className="text-sm font-bold text-text-light dark:text-text-dark">
          Total: ${totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
