"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function TakeTest() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchTest() {
      const response = await axios.get(`http://localhost:3000/admin/courses/api/tests?id=${id}`);
      setTest(response.data.test);
    }
    fetchTest();
  }, [id]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (!test) return <p>Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">{test.title}</h1>

      {test.questions.map((question) => (
        <div key={question.id} className="mt-4 p-4 bg-gray-800 rounded">
          <p>{question.text}</p>
          {question.options.map((option, idx) => (
            <label key={idx} className="block mt-2">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => handleAnswerChange(question.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} className="mt-4 bg-green-500 p-2 rounded">
        Submit
      </button>
    </div>
  );
}
