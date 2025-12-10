import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/Dashboard"];

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};
