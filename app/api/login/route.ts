import { NextResponse } from "next/server";
import { data } from "@/app/login/data/data.user"; 

export async function POST(req: Request) {
  const { username, password } = await req.json();

  
  const user = data.find(
    (u) => u.email === username || u.fullName === username
  );

  if (!user) {
    return NextResponse.json({ error: "invalid username" }, { status: 400 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: "invalid password" }, { status: 400 });
  }

  // Guardar cookie
  const response = NextResponse.json({
    ok: true,
    role: user.role,
  });

  response.cookies.set("isLoggedIn", "true", {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  response.cookies.set("userRole", user.role, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}
