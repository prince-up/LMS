"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams(); // ✅ Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`http://localhost:3000/admin/courses/api/${id}`);

        setCourse(response.data.course);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCourse();
  }, [id]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white">{course.coursename}</h1>
      <p className="text-gray-400 mt-2">{course.description}</p>
      <h2 className="text-2xl text-white mt-4">Course Content:</h2>
      <p className="text-gray-300">{course.content}</p>
    </div>
  );
}
