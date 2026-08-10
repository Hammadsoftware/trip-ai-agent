import { Compass } from "lucide-react";

interface Props {
  onPlanFirstTrip: () => void;
}

export default function EmptyState({ onPlanFirstTrip }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Compass className="w-10 h-10 text-accent" />
      </div>
      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
        Your next adventure starts here ✈️
      </h3>
      <p className="text-sm text-text-light/50 dark:text-text-dark/50 max-w-sm mb-8 leading-relaxed">
        Tell TripAI where you want to go and we'll help plan your journey — from
        flights and hotels to a full day-by-day itinerary.
      </p>
      <button
        onClick={onPlanFirstTrip}
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-accent text-white rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out cursor-pointer"
      >
        <Compass className="w-4 h-4" />
        Plan Your First Trip
      </button>
    </div>
  );
}
