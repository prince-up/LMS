import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Extract 'id' from the dynamic route
  const id = req.nextUrl.pathname.split("/").pop(); // Extracting id from URL

  if (!id) {
    return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: id },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
