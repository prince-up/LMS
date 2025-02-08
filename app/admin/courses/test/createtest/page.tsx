"use client";
import { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "", options: ["", "", "", ""], answer: "" }]);
  const [loading, setLoading] = useState(false);

  function addQuestion() {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], answer: "" }]);
  }

  function updateQuestion(index, field, value) {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  }

  async function createTest() {
    if (!title || questions.some((q) => !q.text || !q.answer || q.options.some(opt => !opt))) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/admin/courses/api/tests", { title, questions });
      alert("Test created successfully!");
      setTitle("");
      setQuestions([{ text: "", options: ["", "", "", ""], answer: "" }]);
    } catch (error) {
      console.error("Error creating test:", error);
      alert("Error creating test. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-12">
      <div className=" rounded-lg shadow-xl p-8 w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-semibold mb-6 text-center">Create Test</h1>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Test Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Test Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {questions.map((q, idx) => (
          <div key={idx} className="border rounded-lg p-4 mb-4 shadow">
            <h2 className="text-xl font-semibold mb-4">Question {idx + 1}</h2>

            <div className="mb-4">
              <label htmlFor={`question-${idx}`} className="block  text-sm font-bold mb-2">Question Text</label>
              <input
                type="text"
                id={`question-${idx}`}
                placeholder="Enter Question Text"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                value={q.text}
                onChange={(e) => updateQuestion(idx, "text", e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block  text-sm font-bold mb-2">Options</label>
              {q.options.map((option, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-2"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...q.options];
                    updatedOptions[i] = e.target.value;
                    updateQuestion(idx, "options", updatedOptions);
                  }}
                  required
                />
              ))}
            </div>

            <div className="mb-4">
              <label htmlFor={`answer-${idx}`} className="block  text-sm font-bold mb-2">Correct Answer</label>
              <input
                type="text"
                id={`answer-${idx}`}
                placeholder="Enter Correct Answer (e.g., A, B, C, D)"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                value={q.answer}
                onChange={(e) => updateQuestion(idx, "answer", e.target.value)}
                required
              />
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Add Question
        </button>

        <button
          onClick={createTest}
          disabled={loading}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Creating..." : "Create Test"}
        </button>
      </div>
    </div>
  );
}
