import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const author = formData.get("author");
    const file = formData.get("file");

    // Pastikan semua field ada
    if (!title || !author || !file) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Pastikan file valid
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid file upload." }, { status: 400 });
    }

    // Path folder uploads
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Pastikan folder uploads ada
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Simpan file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    // Simpan metadata ke database
    const newDocument = await prisma.upload.create({
      data: {
        title,
        author,        
        filePath: `/uploads/${file.name}`,
      },
    });

    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    console.log("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload document." }, { status: 500 });
  }
}


export async function GET() {
  try {
    const documents = await prisma.upload.findMany();
    return NextResponse.json(documents || []);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch documents." }, { status: 500 });
  }
}