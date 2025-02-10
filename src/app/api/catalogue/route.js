import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    try{
      const beans = await prisma.bean.findMany({      
        orderBy: { createdAt: "desc" },
      })
      return NextResponse.json(beans);
    }catch(error){
      console.error("Error fetching beans:", error);
      return NextResponse.json({ error: "Failed to fetch beans" }, { status: 500 });
    }
  }