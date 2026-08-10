import { Plane, Building2, MessageCircle, Map } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  icon: typeof Plane;
  suffix?: string;
}

interface Props {
  stats: StatItem[];
}

export default function QuickStats({ stats }: Props) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 hover:border-accent/20 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <stat.icon className="w-4.5 h-4.5 text-accent" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text-light dark:text-text-dark tabular-nums">
            {stat.value}
            {stat.suffix && (
              <span className="text-sm font-normal text-text-light/40 dark:text-text-dark/40 ml-0.5">
                {stat.suffix}
              </span>
            )}
          </p>
          <p className="text-xs text-text-light/50 dark:text-text-dark/50 mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}

export { Plane, Building2, MessageCircle, Map };
