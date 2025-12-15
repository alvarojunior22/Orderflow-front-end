"use client";

import { createContext, useContext, useState, useCallback } from "react";

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
  success?: boolean;
  message?: string;
  code?: string;
}

type SetAuthField = (value: string | null) => void;

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

function extractStoreIdFromAuthResponse(json: AuthSuccessResponse): string | null {
  const storeFromResponse = json.data.store;
  const user = json.data.user;

  if (storeFromResponse?.id) {
    return storeFromResponse.id;
  }

  if (user.storeId) {
    return user.storeId;
  }

  return null;
}
function persistAuthState(
  setUser: (user: AuthUser | null) => void,
  setAccessToken: SetAuthField,
  setRefreshToken: SetAuthField,
  setStoreId: SetAuthField,
  json: AuthSuccessResponse
): void {
  const { accessToken, refreshToken } = json.data.tokens;
  const resolvedStoreId = extractStoreIdFromAuthResponse(json);

  setUser(json.data.user);
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  setStoreId(resolvedStoreId);

  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(json.data.user));

    if (resolvedStoreId) {
      localStorage.setItem("storeId", resolvedStoreId);
    } else {
      localStorage.removeItem("storeId");
    }
  }
}

async function extractErrorMessage(
  res: Response,
  defaultMessage: string
): Promise<string> {
  try {
    const errorJson: ApiErrorResponse = await res.json();
    if (errorJson.message && typeof errorJson.message === "string") {
      return errorJson.message;
    }
  } catch {
    // Ignore JSON parse errors and fall back to default message
  }

  return defaultMessage;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = window.localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(storedUser);
      if (typeof parsed !== "object" || parsed === null) {
        return null;
      }

      const candidate = parsed as Partial<AuthUser>;
      if (typeof candidate.id !== "string" || typeof candidate.email !== "string") {
        return null;
      }

      return {
        id: candidate.id,
        email: candidate.email,
        role: typeof candidate.role === "string" ? candidate.role : "",
        created_at: typeof candidate.created_at === "string" ? candidate.created_at : "",
        storeId: candidate.storeId,
      };
    } catch {
      return null;
    }
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

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const message = await extractErrorMessage(res, "Invalid credentials");
      throw new Error(message);
    }

    const json: AuthSuccessResponse = await res.json();

    persistAuthState(setUser, setAccessToken, setRefreshToken, setStoreId, json);
  }, []);

  const register = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const payload: {
        email: string;
        password: string;
        full_name?: string;
      } = {
        email,
        password,
      };

      if (fullName) {
        payload.full_name = fullName;
      }

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const message = await extractErrorMessage(
          res,
          "Registration failed"
        );
        throw new Error(message);
      }

      const json: AuthSuccessResponse = await res.json();

      persistAuthState(setUser, setAccessToken, setRefreshToken, setStoreId, json);
    },
    []
  );


  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setStoreId(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("storeId");
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, storeId, login, register, logout }}
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
