"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#060c16] text-white shadow-md shadow-blue-500/20">
      {/* Left Logo */}
      <h1 className="text-lg font-semibold">SkillX</h1>

      {/* Center Navigation */}
      <div className="flex items-center space-x-6 bg-black/20 px-6 py-2 rounded-full shadow-sm shadow-blue-400/20 hover:shadow-blue-500/40 transition-all duration-300">
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/courses/allcourses">Courses</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/courses/create">Add Course</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/courses/create">Add Test</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/courses/allcourses"> Logout</Link>
        </Button>
      </div>

      {/* Right User Mode Button */}
      <Button
        variant="ghost"
        className="bg-black/20 text-white px-6 py-2 rounded-full hover:bg-black/30 shadow-sm shadow-blue-400/20 hover:shadow-blue-500/40 transition-all duration-300"
      >
        User Mode
      </Button>
    </nav>
  );
}
