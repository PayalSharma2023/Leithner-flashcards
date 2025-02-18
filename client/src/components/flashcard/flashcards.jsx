import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = "http://localhost:3000/flashcards";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const res = await axios.get(`${API_URL}`);
    setFlashcards(res.data);
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
    <div>
      {flashcards.map((card) => (
        <div
          key={card._id}
          className="bg-white p-5 shadow-md rounded-lg w-96 mb-4"
        >
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
};

export default Flashcards;
