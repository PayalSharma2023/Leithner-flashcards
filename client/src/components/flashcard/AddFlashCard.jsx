import { useReducer, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:3000/flashcards";

// Reducer to manage flashcard state
const flashcardReducer = (state, action) => {
  switch (action.type) {
    case "SET_FLASHCARDS":
      return action.payload;
    case "ADD_FLASHCARD":
      return [...state, action.payload];
    case "DELETE_FLASHCARD":
      return state.filter((card) => card._id !== action.payload);
    default:
      return state;
  }
};

const FlashcardApp = () => {
  const [flashcards, dispatch] = useReducer(flashcardReducer, []);
  const [form, setForm] = useState({ question: "", answer: "" });

  // Fetch flashcards once on mount
  useEffect(() => {
    axios.get(API_URL).then((res) => dispatch({ type: "SET_FLASHCARDS", payload: res.data }));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Flashcard
  const addFlashcard = async (e) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;
    const res = await axios.post(API_URL, form);
    dispatch({ type: "ADD_FLASHCARD", payload: res.data });
    setForm({ question: "", answer: "" });
  };

  // Delete Flashcard
  const deleteFlashcard = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: "DELETE_FLASHCARD", payload: id });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcard App</h1>
      
      {/* Add Flashcard Form */}
      <form onSubmit={addFlashcard} className="flex gap-2 mb-4">
        <input
          type="text"
          name="question"
          placeholder="Question"
          className="border p-2 rounded w-1/3"
          value={form.question}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          className="border p-2 rounded w-1/3"
          value={form.answer}
          onChange={handleChange}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </motion.button>
      </form>

      {/* Flashcard List */}
      <div className="grid gap-4">
        {flashcards.map((card) => (
          <motion.div
            key={card._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <p><strong>Q:</strong> {card.question}</p>
              <p><strong>A:</strong> {card.answer}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteFlashcard(card._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardApp;
