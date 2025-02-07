"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursePage() {
    const [courses, setCourses] = useState(null); // Start with null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/admin/courses/create");
                console.log("API Response:", response.data);

                // Ensure data is an array
                setCourses(Array.isArray(response.data.courses) ? response.data.courses : []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>; // Only render when data is ready

    return (
        <div suppressHydrationWarning>
            <h1>hi there</h1>
            {courses && courses.length > 0 ? (
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>{course.courseName}</li>
                    ))}
                </ul>
            ) : (
                <p>No courses available</p>
            )}
        </div>
    );
}