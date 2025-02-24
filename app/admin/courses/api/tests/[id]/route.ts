import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const id = (await params)?.id;
  if (!id) {
    return NextResponse.json({ success: false, message: "Test ID is required" }, { status: 400 });
  }

  try {
    const test = await prisma.test.findUnique({
      where: { id: String(id) },
      include: { questions: true },
    });

    if (!test) {
      return NextResponse.json({ success: false, message: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, test, message: "Test found" });
  } catch (error) {
    console.error("Error fetching test:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
