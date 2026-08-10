import type { Hotel } from "../../types";

interface Props {
  hotel: Hotel;
  onSelect: () => void;
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-500 text-xs tracking-tight">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default function HotelCard({ hotel, onSelect }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      {hotel.photo ? (
        <img
          src={hotel.photo}
          alt={hotel.hotel_name}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-bg-light dark:bg-bg-dark flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-text-light/30 dark:text-text-dark/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0H5m0 0H3"
            />
          </svg>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-light dark:text-text-dark mb-0.5 truncate">
          {hotel.hotel_name}
        </p>
        <Stars count={hotel.star_rating} />
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <span className="text-lg font-bold text-text-light dark:text-text-dark">
            ${hotel.price_per_night}
          </span>
          <span className="text-xs text-text-light/50 dark:text-text-dark/50 block">
            /night
          </span>
        </div>
        <button
          onClick={onSelect}
          className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out cursor-pointer"
        >
          View
        </button>
      </div>
    </div>
  );
}
