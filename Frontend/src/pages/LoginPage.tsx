import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { normalizeError } from "../api/client";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (isSignup && !name.trim()) {
      setError("Name is required.");
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        await signup(name.trim(), email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            TripAI
          </h1>
          <p className="text-sm text-text-light/50 dark:text-text-dark/50 mt-1">
            Plan your next adventure.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark px-4 py-2.5 text-sm placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark px-4 py-2.5 text-sm placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark px-4 py-2.5 text-sm placeholder:text-text-light/30 dark:placeholder:text-text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm font-medium bg-accent text-white rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out disabled:opacity-60 disabled:active:scale-100 cursor-pointer"
            >
              {loading
                ? "Please wait..."
                : isSignup
                  ? "Sign Up"
                  : "Log In"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-light/50 dark:text-text-dark/50 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-accent hover:text-accent-hover font-medium cursor-pointer"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
