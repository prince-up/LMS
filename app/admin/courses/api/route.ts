import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.courseName) {
            return NextResponse.json({ error: "Course name is required" }).status(400);
        }

        const course = await prisma.course.create({
            data: {
                coursename: body.courseName,
                description: body.description || "",
            },
        });

        return NextResponse.json({ msg: "Course added successfully", course }).status(201);
    } catch (error: unknown) {
        console.error("Error adding course:", error);
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }).status(500);
    }
}

export async function GET(req: NextRequest) {
    try {
        console.log("Fetching courses...");

        const courses = await prisma.course.findMany();
        console.log("Fetched Courses:", courses);

        return NextResponse.json({ message: "Courses fetched successfully", courses });
    } catch (error: unknown) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}