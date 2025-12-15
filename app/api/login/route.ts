import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const json = await res.json();
  const { accessToken, refreshToken } = json.data.tokens;
  const user = json.data.user;

  const response = NextResponse.json({
    user,
    accessToken,
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
