import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import api, { setApiToken } from "../api/client";
import type { User, AuthResponse } from "../types";

const USER_KEY = "tripai_user";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function persistUser(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch {
    // localStorage may be unavailable
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);
  const [token, setToken] = useState<string | null>(null);

  // If a stored user exists on mount, we are authenticated (session-less auth)
  const isAuthenticated = !!user;

  // Hydrate from localStorage on mount so protected routes work on refresh
  useEffect(() => {
    const stored = loadUser();
    if (stored) setUser(stored);
  }, []);

  const handleAuth = useCallback((data: AuthResponse) => {
    // Backend may not return a token — auth is driven by the user object
    if (data.token) {
      setToken(data.token);
      setApiToken(data.token);
    }
    setUser(data.user);
    persistUser(data.user);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await api.post<AuthResponse>("/auth/signin", {
        email,
        password,
      });
      handleAuth(data);
    },
    [handleAuth]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const { data } = await api.post<AuthResponse>("/auth/signup", {
        name,
        email,
        password,
      });
      handleAuth(data);
    },
    [handleAuth]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setApiToken(null);
    persistUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
