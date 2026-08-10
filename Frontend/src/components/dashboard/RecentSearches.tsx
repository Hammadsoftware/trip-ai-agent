import { Clock, Plane, Trash2 } from "lucide-react";
import type { RecentSearch } from "../../types";

interface Props {
  searches: RecentSearch[];
  onPlanAgain: (query: string) => void;
  onClear: () => void;
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function RecentSearches({
  searches,
  onPlanAgain,
  onClear,
}: Props) {
  if (searches.length === 0) return null;

  return (
    <section className="rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
      <div className="px-5 py-3 border-b border-border-light dark:border-border-dark flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">
            Recent Searches
          </h3>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-text-light/40 dark:text-text-dark/40 hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Clear recent searches"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>

      <div className="divide-y divide-border-light dark:divide-border-dark">
        {searches.map((search) => (
          <div
            key={search.id}
            className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-bg-light dark:hover:bg-bg-dark transition-colors duration-100"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-light dark:text-text-dark truncate">
                  {search.destination}
                </p>
                <p className="text-xs text-text-light/40 dark:text-text-dark/40 truncate">
                  {search.query}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-text-light/40 dark:text-text-dark/40 tabular-nums">
                {formatDate(search.timestamp)}
              </span>
              <button
                onClick={() => onPlanAgain(search.query)}
                className="text-xs font-medium text-accent hover:text-accent-hover transition-colors cursor-pointer"
              >
                Plan Again
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
