"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { API_BASE_URL } from "../lib/config";
import type { AuthResponse, AuthUser } from "../lib/types";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  email: string;
  setEmail: (value: string) => void;
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<AuthUser>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function api(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request error ${response.status}`;
    try {
      const body = (await response.json()) as { error?: string };
      message = body.error || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const refresh = useCallback(async () => {
    try {
      const data = (await api("/auth/validate-token", { method: "GET" })) as AuthResponse;
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const requestOtp = useCallback(async (inputEmail: string) => {
    await api("/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email: inputEmail }),
    });
  }, []);

  const verifyOtp = useCallback(async (inputEmail: string, otp: string) => {
    const data = (await api("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email: inputEmail, otp }),
    })) as AuthResponse;
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await api("/auth/logout", { method: "POST" });
    setUser(null);
    setEmail("");
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ user, loading, email, setEmail, requestOtp, verifyOtp, refresh, logout }),
    [user, loading, email, requestOtp, verifyOtp, refresh, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
