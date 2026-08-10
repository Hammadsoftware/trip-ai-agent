import { useState, type FormEvent } from "react";
import { Sparkles, Send, Plane, Users, Briefcase, Globe } from "lucide-react";

interface Props {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QUICK_SUGGESTIONS = [
  { icon: Plane, label: "Weekend getaway", prompt: "Plan a weekend getaway trip" },
  { icon: Users, label: "Family vacation", prompt: "Plan a family vacation for 4" },
  { icon: Briefcase, label: "Business trip", prompt: "Plan a business trip" },
  { icon: Globe, label: "International trip", prompt: "Plan an international trip" },
];

export default function TripPlanner({ onSubmit, isLoading }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
  }

  function handleSuggestion(prompt: string) {
    onSubmit(prompt);
  }

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      {/* Subtle gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(217,119,87,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative px-6 py-10 sm:px-10 sm:py-14">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI Trip Planner
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-2">
            Where would you like to go?
          </h2>
          <p className="text-sm text-text-light/50 dark:text-text-dark/50 mb-8">
            Tell TripAI your destination, dates, and preferences — we'll handle
            the rest.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="plane a trip from lahore to dubai ..."
                disabled={isLoading}
                className="w-full rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark px-5 py-3.5 text-sm placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !value.trim()}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white text-sm font-medium rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out disabled:opacity-50 disabled:active:scale-100 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Plan Trip</span>
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {QUICK_SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSuggestion(s.prompt)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-border-light dark:border-border-dark text-text-light/60 dark:text-text-dark/60 hover:border-accent/40 hover:text-accent transition-colors duration-150 disabled:opacity-40 cursor-pointer"
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
