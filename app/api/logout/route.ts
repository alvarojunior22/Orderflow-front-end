import { NextResponse } from "next/server";

export  async function POST() {
  const res = NextResponse.json({ message: 'logout success' })
  
  res.cookies.set("isLoggedIn", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  return res
}