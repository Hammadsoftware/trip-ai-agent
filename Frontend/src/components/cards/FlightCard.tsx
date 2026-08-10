import type { Flight } from "../../types";

interface Props {
  flight: Flight;
  onSelect: () => void;
}

export default function FlightCard({ flight, onSelect }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-text-light dark:text-text-dark">
            {flight.airline}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-bg-light dark:bg-bg-dark text-text-light/60 dark:text-text-dark/60">
            {flight.flight_number}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-light/70 dark:text-text-dark/70">
          <span>{flight.departure_time}</span>
          <span className="text-xs">→</span>
          <span>{flight.arrival_time}</span>
          <span className="text-xs">·</span>
          <span>{flight.duration}</span>
          <span className="text-xs">·</span>
          <span>
            {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-lg font-bold text-text-light dark:text-text-dark">
          ${flight.price}
        </span>
        <button
          onClick={onSelect}
          className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out cursor-pointer"
        >
          Select
        </button>
      </div>
    </div>
  );
}
