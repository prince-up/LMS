"use client";
import { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "", options: ["", "", "", ""], answer: "" }]);
  const [loading, setLoading] = useState(false);

  // Function to add a new question dynamically
  function addQuestion() {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], answer: "" }]);
  }

  // Function to update a question
  function updateQuestion(index, field, value) {
    const updatedQuestions = [...questions];
    if (field === "options") updatedQuestions[index].options = value;
    else updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  }

  // Function to create a new test
  async function createTest() {
    if (!title || questions.some((q) => !q.text || !q.answer)) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/admin/courses/api/tests", { title, questions });
      alert("Test created successfully!");
      setTitle("");
      setQuestions([{ text: "", options: ["", "", "", ""], answer: "" }]);
    } catch (error) {
      console.error("Error creating test:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Admin Panel - Create Test</h1>

      {/* Test Title Input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Test Title"
          className="p-2 border rounded mr-2 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Questions List */}
      {questions.map((q, idx) => (
        <div key={idx} className="mt-4 p-4 bg-gray-800 rounded">
          <input
            type="text"
            placeholder="Question text"
            className="p-2 border rounded w-full text-black"
            value={q.text}
            onChange={(e) => updateQuestion(idx, "text", e.target.value)}
          />
          {q.options.map((option, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              className="p-2 border rounded w-full mt-2 text-black"
              value={q.options[i]}
              onChange={(e) => {
                const updatedOptions = [...q.options];
                updatedOptions[i] = e.target.value;
                updateQuestion(idx, "options", updatedOptions);
              }}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            className="p-2 border rounded w-full mt-2 text-black"
            value={q.answer}
            onChange={(e) => updateQuestion(idx, "answer", e.target.value)}
          />
        </div>
      ))}

      {/* Add Question Button */}
      <button onClick={addQuestion} className="mt-4 bg-gray-500 p-2 rounded">
        ➕ Add Question
      </button>

      {/* Create Test Button */}
      <button onClick={createTest} disabled={loading} className="mt-4 bg-blue-500 p-2 rounded">
        {loading ? "Creating..." : "Create Test"}
      </button>
    </div>
  );
}
