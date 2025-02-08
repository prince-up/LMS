"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function TestPage({ params }) {
  const { testId } = params;
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchTest() {
      console.log(testId);
      try {
        const response = await axios.get(`http://localhost:3000/admin/courses/api/tests/${testId}`);
        console.log("API Response:", response.data); 
        setTest(response.data.test);
      } catch (error) {
        console.error("Error fetching test details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (testId) fetchTest();
  }, [testId]);

  if (loading) return <div className="text-center text-white">Loading test details...</div>;
  if (!test) return <div className="text-center text-white">Test not found.</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{test.title}</h1>
      <ul>
        {test.questions.map((question) => (
          <li key={question.id} className="mb-6 p-4 bg-gray-800 rounded-lg">
            <p className="font-semibold mb-2">{question.text}</p>
            <ul className="list-disc pl-5">
              {question.options.map((option, index) => (
                <li key={index} className="text-gray-300">{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={() => router.back()} className="mt-4 p-3 bg-blue-600 rounded text-white hover:bg-blue-700">
        Back to Tests
      </button>
    </div>
  );
}