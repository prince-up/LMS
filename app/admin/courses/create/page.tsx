"use client";
import axios from "axios";
import { useState } from 'react';
import { Button } from "@/components/ui/button"



export default function Page() {
    const [coursename, setCoursename] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function postData() {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("http://localhost:3000/admin/courses/api", {
                courseName: coursename,
                description
            });
            setSuccess(response.data.msg);
            setCoursename("");
            setDescription("");
        } catch (err: any) {
            setError(err.response ? err.response.data.error : "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Create Course</h1>
            <br />
            <input
                type="text"
                placeholder="Course Name"
                value={coursename}
                onChange={(e) => setCoursename(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <Button onClick={postData} disabled={loading}>
                {loading ? "Posting..." : "Post"}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}