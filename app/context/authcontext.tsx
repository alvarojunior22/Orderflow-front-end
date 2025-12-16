"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ApiMyStoresResponse } from "@/app/api/types/api-store";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
  storeId?: string;
}

interface AuthStore {
  id: string;
}

interface AuthSuccessResponse {
  data: {
    tokens: AuthTokens;
    user: AuthUser;
    store?: AuthStore;
  };
}

interface ApiErrorResponse {
  message?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  storeId: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

/* -------------------- Helpers -------------------- */

function extractStoreId(json: AuthSuccessResponse): string | null {
  return json.data.store?.id ?? json.data.user.storeId ?? null;
}

async function resolveStoreId(accessToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/api/stores/my-stores`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) return null;

    const json: ApiMyStoresResponse = await res.json();
    return json.data?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

async function extractError(res: Response, fallback: string) {
  try {
    const json: ApiErrorResponse = await res.json();
    return json.message ?? fallback;
  } catch {
    return fallback;
  }
}

/* -------------------- Provider -------------------- */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [accessToken, setAccessToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null
  );

  const [storeId, setStoreId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("storeId") : null
  );

  /* -------- Sync storeId if missing -------- */

  useEffect(() => {
    if (!accessToken || storeId) return;

    resolveStoreId(accessToken).then((resolved) => {
      if (!resolved) return;
      setStoreId(resolved);
      localStorage.setItem("storeId", resolved);
    });
  }, [accessToken, storeId]);

  /* -------------------- Login -------------------- */

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(await extractError(res, "Invalid credentials"));
    }

    const json: AuthSuccessResponse = await res.json();
    const { accessToken, refreshToken } = json.data.tokens;
    const resolvedStoreId = extractStoreId(json);

    setUser(json.data.user);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setStoreId(resolvedStoreId);

    // 🔑 tokens reales
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(json.data.user));

    if (resolvedStoreId) {
      localStorage.setItem("storeId", resolvedStoreId);
    }

    // 🍪 flag para middleware
    document.cookie = "auth=1; path=/; SameSite=Lax";
  }, []);

  /* -------------------- Register -------------------- */

  const register = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          ...(fullName ? { full_name: fullName } : {}),
        }),
      });

      if (!res.ok) {
        throw new Error(await extractError(res, "Registration failed"));
      }

      const json: AuthSuccessResponse = await res.json();
      await login(email, password);
    },
    [login]
  );

  /* -------------------- Logout -------------------- */

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setStoreId(null);

    localStorage.clear();
    document.cookie = "auth=; path=/; max-age=0";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        storeId,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* -------------------- Hook -------------------- */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
