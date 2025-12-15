"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  storeId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null
  );

  const [storeId, setStoreId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("storeId") : null
  );

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const json = await res.json();

    const { accessToken, refreshToken } = json.data.tokens;
    const userId = json.data.user.id;

    // Use user.id as storeId
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setStoreId(userId);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("storeId", userId);
  }, []);


  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setStoreId(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("storeId");
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, storeId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
