import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    try{
      const distributor = await prisma.distributor.findMany({      
        orderBy: { createdAt: "desc" },
      })
      return NextResponse.json(distributor);
    }catch(error){
      console.error("Error fetching distributors:", error);
      return NextResponse.json({ error: "Failed to fetch distributors" }, { status: 500 });
    }
  }