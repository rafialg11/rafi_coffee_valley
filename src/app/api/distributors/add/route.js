import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const bodyText = await req.text();
    if (!bodyText) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }

    const { name, city, state, country, phone, email } = JSON.parse(bodyText);

    if (!name || !city || !state || !country || !phone || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newDistributor = await prisma.distributor.create({
      data: { name, city, state, country, phone, email },
    });

    return NextResponse.json(newDistributor, { status: 201 });
  } catch (error) {
    console.error("Error adding distributor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
