// app/lib/authFetch.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const initHeaders = new Headers(init.headers);

  if (accessToken) {
    initHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(input, {
    ...init,
    headers: initHeaders,
  });

  if (res.status !== 401) return res;

  // Access token expired → refresh
  const refreshToken = localStorage.getItem("refreshToken");

  const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshRes.ok) {
    localStorage.clear();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  const refreshJson = await refreshRes.json();
  const newTokens = refreshJson.data.tokens;

  localStorage.setItem("accessToken", newTokens.accessToken);
  localStorage.setItem("refreshToken", newTokens.refreshToken);

  const retryHeaders = new Headers(init.headers);
  retryHeaders.set("Authorization", `Bearer ${newTokens.accessToken}`);

  return fetch(input, {
    ...init,
    headers: retryHeaders,
  });
}
