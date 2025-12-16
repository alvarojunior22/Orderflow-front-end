import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoggedIn = req.cookies.get("auth")?.value === "1";

  const isDashboard = pathname.startsWith("/Dashboard");
  const isLogin = pathname === "/login";

  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/Dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*", "/login"],
};
