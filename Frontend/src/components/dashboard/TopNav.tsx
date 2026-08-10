import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon, LogOut, ChevronDown } from "lucide-react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function TopNav() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const initials = (user?.name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-text-light dark:text-text-dark">
          TripAI
        </h1>
        <span className="hidden sm:inline text-sm text-text-light/50 dark:text-text-dark/50">
          |
        </span>
        <span className="hidden sm:inline text-sm text-text-light/70 dark:text-text-dark/70">
          {getGreeting()}, {firstName} 👋
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-[var(--radius-card)] text-text-light/60 dark:text-text-dark/60 hover:bg-bg-light dark:hover:bg-bg-dark transition-colors duration-150 cursor-pointer"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-[var(--radius-card)] hover:bg-bg-light dark:hover:bg-bg-dark transition-colors duration-150 cursor-pointer"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <ChevronDown
              className={`w-4 h-4 text-text-light/50 dark:text-text-dark/50 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-lg z-50 overflow-hidden animate-fade-in-up">
              <div className="px-4 py-3 border-b border-border-light dark:border-border-dark">
                <p className="text-sm font-semibold text-text-light dark:text-text-dark truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-text-light/50 dark:text-text-dark/50 truncate">
                  {user?.email}
                </p>
              </div>
              <div className="p-1">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-text-light/70 dark:text-text-dark/70 hover:bg-bg-light dark:hover:bg-bg-dark rounded-[var(--radius-card)] transition-colors duration-150 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
