import { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const API_URL = "http://localhost:3000/flashcards";

function HomePage() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const res = await axios.get(API_URL);
    setFlashcards(res.data);
  };

  const addFlashcard = async () => {
    if (!question || !answer) return;
    await axios.post(API_URL, { question, answer });
    setQuestion("");
    setAnswer("");
    fetchFlashcards();
  };

  const updateFlashcard = async (id, correct) => {
    await axios.put(`${API_URL}/${id}`, { correct });
    fetchFlashcards();
  };

  const deleteFlashcard = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchFlashcards();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Leitner Flashcards</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addFlashcard}
        >
          Add
        </button>
      </div>
      {flashcards.map((card) => (
        <div key={card._id} className="bg-white p-5 shadow-md rounded-lg w-96 mb-4">
          <p className="font-bold">{card.question}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            onClick={() => alert(card.answer)}
          >
            Show Answer
          </button>
          <div className="flex mt-3">
            <button
              className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
              onClick={() => updateFlashcard(card._id, true)}
            >
              Got it Right
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => updateFlashcard(card._id, false)}
            >
              Got it Wrong
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 ml-2 rounded"
              onClick={() => deleteFlashcard(card._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
