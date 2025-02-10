import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {    
    const beans = await prisma.bean.findMany({
      take: 2,
      where: { salePrice: { lt:15 } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(beans);
  } catch (error) {
    console.error("Error fetching beans:", error);
    return NextResponse.json({ error: "Failed to fetch beans" }, { status: 500 });
  }
}
