import { useState, useCallback, useRef, useMemo } from "react";
import { postAiQuery, normalizeError } from "../api/client";
import TopNav from "../components/dashboard/TopNav";
import TripPlanner from "../components/dashboard/TripPlanner";
import QuickStats, { Plane, Building2, MessageCircle, Map } from "../components/dashboard/QuickStats";
import TripResults from "../components/dashboard/TripResults";
import RecentSearches from "../components/dashboard/RecentSearches";
import EmptyState from "../components/dashboard/EmptyState";
import { LoadingIndicator, CardSkeleton, ResultSkeleton } from "../components/dashboard/SkeletonLoader";
import type { AiResponse, RecentSearch } from "../types";

const RECENT_KEY = "tripai_recent_searches";
const MAX_RECENT = 10;

function loadSearches(): RecentSearch[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSearches(searches: RecentSearch[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(searches));
  } catch {
    // ignore
  }
}

function extractDestination(query: string): string {
  const toMatch = query.match(/to\s+([A-Za-z\s]+?)(?:\s+for|\s+\d|\s*$)/);
  if (toMatch) return toMatch[1].trim();
  return query.replace(/plan\s+(a\s+)?(trip\s+)?/i, "").trim().slice(0, 40) || "Trip";
}

export default function DashboardPage() {
  const [aiResponse, setAiResponse] = useState<AiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(loadSearches);
  const plannerRef = useRef<HTMLDivElement>(null);

  const addRecentSearch = useCallback((query: string) => {
    const search: RecentSearch = {
      id: crypto.randomUUID(),
      query,
      destination: extractDestination(query),
      timestamp: new Date().toISOString(),
    };
    setRecentSearches((prev) => {
      const updated = [search, ...prev.filter((s) => s.query !== query)].slice(
        0,
        MAX_RECENT
      );
      saveSearches(updated);
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentSearches([]);
    saveSearches([]);
  }, []);

  const handlePlanTrip = useCallback(
    async (query: string) => {
      setError("");
      setAiResponse(null);
      setIsLoading(true);
      addRecentSearch(query);

      try {
        const data = await postAiQuery(query);
        setAiResponse(data);
      } catch (err: unknown) {
        let message = normalizeError(err);
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err
        ) {
          const axiosErr = err as { response: { status?: number } };
          const status = axiosErr.response?.status;
          if (status === 401) message = "Your session has expired. Please log in again.";
          else if (status === 404) message = "The AI service is currently unavailable.";
          else if (status && status >= 500) message = "The server is experiencing issues. Please try again later.";
        }
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [addRecentSearch]
  );

  const handleDismissResults = useCallback(() => {
    setAiResponse(null);
    setError("");
  }, []);

  const handlePlanFirstTrip = useCallback(() => {
    plannerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const hasResults = aiResponse && aiResponse.data;

  const stats = useMemo(() => [
    {
      label: "Trips Planned",
      value: recentSearches.length,
      icon: Map,
    },
    {
      label: "Flights Found",
      value: hasResults
        ? aiResponse.data.flights?.items?.length ?? 0
        : 0,
      icon: Plane,
    },
    {
      label: "Hotels Found",
      value: hasResults
        ? aiResponse.data.hotels?.items?.length ?? 0
        : 0,
      icon: Building2,
    },
    {
      label: "AI Requests",
      value: hasResults ? aiResponse.meta.llm_calls : 0,
      icon: MessageCircle,
    },
  ], [recentSearches.length, hasResults, aiResponse]);

  return (
    <div className="h-screen flex flex-col bg-bg-light dark:bg-bg-dark">
      <TopNav />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Hero Trip Planner */}
          <div ref={plannerRef}>
            <TripPlanner onSubmit={handlePlanTrip} isLoading={isLoading} />
          </div>

          {/* Error state */}
          {error && (
            <div className="rounded-[var(--radius-card)] border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 flex items-start justify-between gap-3 animate-fade-in-up">
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  We couldn't plan that trip
                </p>
                <p className="text-xs text-red-600 dark:text-red-300 mt-0.5">
                  {error}
                </p>
              </div>
              <button
                onClick={() => handlePlanTrip(recentSearches[0]?.query ?? "")}
                className="text-sm font-medium text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline cursor-pointer shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
              <LoadingIndicator text="Planning your trip..." />
              <ResultSkeleton />
            </>
          )}

          {/* Results */}
          {hasResults && !isLoading && (
            <>
              <QuickStats stats={stats} />
              <TripResults
                data={aiResponse.data}
                response={aiResponse.response}
                onClose={handleDismissResults}
              />
            </>
          )}

          {/* Empty state */}
          {!hasResults && !isLoading && !error && (
            <EmptyState onPlanFirstTrip={handlePlanFirstTrip} />
          )}

          {/* Recent searches */}
          <RecentSearches
            searches={recentSearches}
            onPlanAgain={handlePlanTrip}
            onClear={clearRecent}
          />
        </div>
      </main>
    </div>
  );
}
