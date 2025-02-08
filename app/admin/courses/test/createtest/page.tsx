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
    if (field === "options") {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/2">
        <h1 className="text-3xl font-semibold mb-6 text-center">Admin Panel - Create Test</h1>

        {/* Test Title Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Test Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Test Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Questions List */}
        {questions.map((q, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-lg font-bold mb-2">Question {idx + 1}</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question-${idx}`}>
                Question Text
              </label>
              <input
                type="text"
                id={`question-${idx}`}
                placeholder="Enter Question Text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={q.text}
                onChange={(e) => updateQuestion(idx, "text", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`options-${idx}`}>
                Options
              </label>
              {q.options.map((option, i) => (
                <input
                  key={i}
                  type="text"
                  id={`options-${idx}-${i}`}
                  placeholder={`Option ${i + 1}`}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  value={q.options[i]}
                  onChange={(e) => {
                    const updatedOptions = [...q.options];
                    updatedOptions[i] = e.target.value;
                    updateQuestion(idx, "options", updatedOptions);
                  }}
                />
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`answer-${idx}`}>
                Correct Answer
              </label>
              <input
                type="text"
                id={`answer-${idx}`}
                placeholder="Enter Correct Answer"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={q.answer}
                onChange={(e) => updateQuestion(idx, "answer", e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        >
          ➕ Add Question
        </button>

        {/* Create Test Button */}
        <button
          onClick={createTest}
          disabled={loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Creating..." : "Create Test"}
        </button>
      </div>
    </div>
  );
}