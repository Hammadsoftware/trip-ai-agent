export function CardSkeleton() {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 animate-pulse">
      <div className="h-4 w-20 bg-bg-light dark:bg-bg-dark rounded mb-4" />
      <div className="space-y-2">
        <div className="h-8 w-16 bg-bg-light dark:bg-bg-dark rounded" />
        <div className="h-3 w-28 bg-bg-light dark:bg-bg-dark rounded" />
      </div>
    </div>
  );
}

export function ResultSkeleton() {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-5 w-5 rounded bg-bg-light dark:bg-bg-dark" />
        <div className="h-5 w-32 bg-bg-light dark:bg-bg-dark rounded" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border-light dark:border-border-dark"
          >
            <div className="space-y-2 flex-1">
              <div className="h-4 w-24 bg-bg-light dark:bg-bg-dark rounded" />
              <div className="h-3 w-48 bg-bg-light dark:bg-bg-dark rounded" />
            </div>
            <div className="h-5 w-16 bg-bg-light dark:bg-bg-dark rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingIndicator({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative w-16 h-16">
        {/* Spinning globe/travel ring */}
        <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
        <div className="absolute inset-2 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center">
          <span className="text-xl">
            <svg className="w-6 h-6 text-accent animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </span>
        </div>
      </div>
      <p className="text-sm text-text-light/50 dark:text-text-dark/50 animate-pulse">
        {text}
      </p>
    </div>
  );
}
