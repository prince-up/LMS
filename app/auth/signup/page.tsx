"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/api/signup", formData);
      setMessage("✅ Signup successful! Redirecting...");
      
      setTimeout(() => {
        router.push("/home/view");
      }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden">
         <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_100px_50px_#fff,0_0_160px_100px_#f0f,0_0_200px_140px_#0ff]"></div>

      <Card className="w-full max-w-md bg-sky-500/30 border border-gray-700 shadow-lg rounded-xl relative z-10">

        <CardHeader>
          <CardTitle className="text-center text-white text-2xl font-bold">Create an Account</CardTitle>
          <p className="text-center text-gray-400">Join our courses today!</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
              Sign Up
            </Button>
          </form>
          {message && (
            <p className="mt-2 text-center text-green-400 font-medium">{message}</p>
          )}
          <p className="text-center text-gray-400 text-sm mt-3">
            Already have an account? <a href="http://localhost:3000/auth/login" className="text-blue-400 hover:text-blue-500">Login here</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
