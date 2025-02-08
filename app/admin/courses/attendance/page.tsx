"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get("http://localhost:3000/auth/api/login");
        if (response.data.success) {
          setStudents(response.data.users);
          // Initialize attendance state with false (absent)
          const initialAttendance = response.data.users.reduce((acc, student) => {
            acc[student.id] = false;
            return acc;
          }, {});
          setAttendance(initialAttendance);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle attendance
    }));
  };

  const submitAttendance = () => {
    console.log("Attendance Submitted:", attendance);
    alert("Attendance marked successfully!");
  };

  if (loading) return <div className="text-center text-white">Loading students...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6">Mark Attendance</h1>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul>
          {students.map((student) => (
            <li key={student.id} className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-lg">{student.name}</span>
              <input
                type="checkbox"
                checked={attendance[student.id] || false}
                onChange={() => toggleAttendance(student.id)}
                className="w-5 h-5"
              />
            </li>
          ))}
        </ul>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Submit Attendance</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Attendance</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit the attendance? You cannot modify it after submission.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="col-span-4 text-center">
                  Please confirm your submission.
                </Label>
              </div>
            </div>
            <DialogFooter>
            <button type="submit"
          onClick={submitAttendance}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-lg transition"
        >
          Submit Attendance</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
