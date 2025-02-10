import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Debug: Periksa apakah request body ada
    const bodyText = await req.text();
    console.log("Raw request body:", bodyText);

    // Parse JSON
    if (!bodyText) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }

    const { username, password } = JSON.parse(bodyText);
    console.log("Parsed body:", { username, password });

    // Cek apakah username dan password dikirim
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    // Cari user berdasarkan username
    const user = await prisma.login.findFirst({
      where: { username },
    });

    // Jika user tidak ditemukan atau password salah
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Set cookie
    const response = NextResponse.json({ message: "Login successful" });

    response.headers.set(
      "Set-Cookie",
      serialize("auth_token", String(user.id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 60 * 60 * 1000), // Cookie expires in 1 hour
      })
    );

    return response; // <-- Tambahkan return di sini
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
