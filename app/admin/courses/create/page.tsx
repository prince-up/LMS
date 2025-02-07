"use client";
import axios from "axios";
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
    const [coursename, setCoursename] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [success, setSuccess] = useState(null);

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
        <div className=" flex mt-16 ml-30 justify-center">
             <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Create Course</CardTitle>
        <CardDescription>Create new course in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Course Name</Label>
              <Input id="name"
                placeholder="Course Name"
                value={coursename}
                onChange={(e) => setCoursename(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Textarea  type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">

        <Button onClick={postData} disabled={loading}>
                {loading ? "Posting..." : "Post"}
        </Button>
        
      </CardFooter>
    </Card>
            
            
           
        </div>
    );
}