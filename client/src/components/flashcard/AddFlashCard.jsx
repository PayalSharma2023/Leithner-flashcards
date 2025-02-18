import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:3000/flashcards";

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Fetch flashcards from the backend
  useEffect(() => {
    const fetchFlashcards = async () => {
      const res = await axios.get(API_URL);
      console.log(res.data)
      setFlashcards(res.data);
    };
    fetchFlashcards();
  }, []);

  // Add Flashcard
  const addFlashcard = async (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    const res = await axios.post(API_URL, { question, answer });
    setFlashcards([...flashcards, res.data]);
    setQuestion("");
    setAnswer("");
  };

  // Delete Flashcard
  const deleteFlashcard = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setFlashcards(flashcards.filter((card) => card._id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcard App</h1>
      
      <form onSubmit={addFlashcard} className="mb-4">
        <input
          type="text"
          placeholder="Question"
          className="border p-2 rounded mr-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          className="border p-2 rounded mr-2"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
      </form>

      <div className="grid gap-4">
        {flashcards.map((card) => (
          <motion.div
            key={card._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border rounded shadow"
          >
            <p><strong>Q:</strong> {card.question}</p>
            <p><strong>A:</strong> {card.answer}</p>
            <button
              onClick={() => deleteFlashcard(card._id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardApp;
