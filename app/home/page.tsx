"use client";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar"

export default function Web3Journey() {
  return (
    <>
    {/* <Navbar/> */}
    <div className="relative min-h-screen flex flex-col items-center pt-40 bg-black text-white px-6">
      {/* "Book Your Slots now" Button */}

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-3">
        Start Your Web and <span className="text-blue-400">DSA</span> Journey with us
      </h1>
      
      {/* Subtext */}
      <p className="text-gray-400 text-center mb-6 max-w-2xl">
        Join Our courses and get the firsthand knowledge about web and DSA
      </p>

      {/* View Courses Button */}
      <a href="http://localhost:3000/home/view" className="border border-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 hover:bg-purple-500 hover:text-black transition">
        View Courses →
      </a>

      {/* Circular Animation */}
      <div className="absolute bottom-10 right-10 animate-spin-slow">
        <span className="text-sm text-purple-400 font-medium">Thanks for Visiting</span>
        <span className="ml-2">💜</span>
      </div>
    </div>
    </>
  );
}
