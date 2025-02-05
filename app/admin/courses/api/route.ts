import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.courseName) {
            return NextResponse.json({ error: "Course name is required" }, { status: 400 });
        }

        const course = await prisma.courses.create({
            data: {
                coursename: body.courseName,
                description: body.description || "",
            },
        });

        return NextResponse.json({ msg: "Course added successfully", course }, { status: 201 });
    } catch (error) {
        console.error("Error adding course:", error);
        //@ts-ignore
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const courses = await prisma.courses.findMany();
        return NextResponse.json({ message: "Courses fetched successfully", courses }, { status: 200 });
    } catch (error) {
        console.error("Error fetching courses:", error);
        //@ts-ignore
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}