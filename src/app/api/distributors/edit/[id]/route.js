import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get distributor by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const distributor = await prisma.distributor.findUnique({
      where: { id: parseInt(id) },
    });

    if (!distributor) {
      return NextResponse.json({ error: "Distributor not found" }, { status: 404 });
    }

    return NextResponse.json(distributor);
  } catch (error) {
    console.error("Error fetching distributor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Update distributor by ID
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updatedDistributor = await prisma.distributor.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return NextResponse.json(updatedDistributor);
  } catch (error) {
    console.error("Error updating distributor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
