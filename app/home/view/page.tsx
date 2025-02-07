"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursePage() {
    const [courses, setCourses] = useState(null); // Start with null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/admin/courses/api");
                // D:\Cohort 3\course\app\admin\courses\api
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
        <div>
            <h1>hi there</h1>
            {courses && courses.length > 0 ? (
                <ul>
                    <div className="grid grid-cols-3 gap-4">
                    {courses.map((course, index) => (
                        <div className="bg-slate-900 p-4 rounded-lg shadow-md">

                        <li key={index}>
                        <h1 className="text-xl font-semibold text-white"> {course.coursename} </h1> : {course.description}</li>
                        </div>
                    ))}
            </div>
                </ul>
            ) : (
                <p>No courses available</p>
            )}
        </div>
    );
}
