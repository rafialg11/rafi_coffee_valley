import { NextResponse } from "next/server";

export async function GET(req) {
  const cookies = req.cookies.get("auth_token");

  if (!cookies) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ user: { username: "admin" } });
}
