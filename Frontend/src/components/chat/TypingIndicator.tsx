export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] px-4 py-3 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark rounded-[var(--radius-card)] rounded-bl-md">
        <p className="text-sm tracking-wider text-text-light/50 dark:text-text-dark/50">
          ...
        </p>
      </div>
    </div>
  );
}
