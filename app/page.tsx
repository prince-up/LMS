"use client";
import { Button } from "@/components/ui/button";

export default function Web3Journey() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      {/* "Book Your Slots now" Button */}
      <button className="border border-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 hover:bg-purple-500 hover:text-black transition">
        Book Your Slots now
      </button>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-3">
        Start Your Web and <span className="text-blue-400">Web3</span> Journey with us
      </h1>
      
      {/* Subtext */}
      <p className="text-gray-400 text-center mb-6 max-w-2xl">
        Join Our courses and get the firsthand knowledge about web and web3
      </p>

      {/* View Courses Button */}
      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-lg font-medium rounded-full flex items-center gap-2">
        View Courses →
      </Button>

      {/* Circular Animation */}
      <div className="absolute bottom-10 right-10 animate-spin-slow">
        <span className="text-sm text-purple-400 font-medium">Thanks for Visiting</span>
        <span className="ml-2">💜</span>
      </div>
    </div>
  );
}
