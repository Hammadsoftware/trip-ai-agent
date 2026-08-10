import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import type { Conversation } from "../types";

interface Props {
  conversations: Conversation[];
  activeConversationId: string;
  onNewTrip: () => void;
  onSelectConversation: (id: string) => void;
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onNewTrip,
  onSelectConversation,
}: Props) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <aside className="w-[280px] h-full flex flex-col border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <div className="p-4 border-b border-border-light dark:border-border-dark">
        <h1 className="text-lg font-bold text-text-light dark:text-text-dark mb-0.5">
          TripAI
        </h1>
        <p className="text-xs text-text-light/50 dark:text-text-dark/50 truncate">
          {user?.email}
        </p>
      </div>

      <div className="p-3">
        <button
          onClick={onNewTrip}
          className="w-full px-4 py-2.5 text-sm font-medium bg-accent text-white rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out cursor-pointer"
        >
          + New Trip
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {conversations.length === 0 && (
          <p className="text-xs text-text-light/30 dark:text-text-dark/30 text-center py-8">
            No conversations yet
          </p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`w-full text-left px-3 py-2 rounded-[var(--radius-card)] text-sm truncate transition-colors duration-150 cursor-pointer ${
              conv.id === activeConversationId
                ? "bg-accent/10 text-accent font-medium"
                : "text-text-light/70 dark:text-text-dark/70 hover:bg-bg-light dark:hover:bg-bg-dark"
            }`}
          >
            {conv.title}
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-border-light dark:border-border-dark flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-text-light/70 dark:text-text-dark/70 hover:bg-bg-light dark:hover:bg-bg-dark rounded-[var(--radius-card)] transition-colors duration-150 cursor-pointer"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <button
          onClick={logout}
          className="flex-1 px-3 py-2 text-sm text-text-light/70 dark:text-text-dark/70 hover:bg-bg-light dark:hover:bg-bg-dark rounded-[var(--radius-card)] transition-colors duration-150 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
