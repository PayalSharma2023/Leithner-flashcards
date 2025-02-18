import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
const API_URL = "http://localhost:3000/flashcards";
// eslint-disable-next-line react/prop-types
const AddFlashCard = ({ handler }) => {
  const [currentCards, setCurrentCards] = useState([]);
  const [textAreaFront, setTextAreaFront] = useState("");
  const [textAreaBack, setTextAreaBack] = useState("");
  const [frontError, setFrontError] = useState("");
  const [backError, setBackError] = useState("");
  const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const validate = () => {
    let isError = false;
    setFrontError("");
    setBackError("");

    if (textAreaFront.trim() === "") {
      setFrontError("Front side must have input");
      isError = true;
    }
    if (textAreaBack.trim() === "") {
      setBackError("Back side must have input");
      isError = true;
    }
    return isError;
  };
  const addFlashcard = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const newCard = { front: textAreaFront, back: textAreaBack };
      setCurrentCards([...currentCards, newCard]);
      handler([...currentCards, newCard]); // Send to parent
      setTextAreaFront("");
      setTextAreaBack("");
      setIsOpen(false);
    }
    if (!question || !answer) return;
    await axios.post(API_URL, { question, answer });
    setQuestion("");
    setAnswer("");
  };
  return (
    <>
      {/* Button to open modal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-all"
      >
        + Add Flashcard
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-background p-6 rounded-lg shadow-lg w-96"
          >
            <h3 className="text-xl font-bold text-primary">Add Flashcard</h3>

            {/* Flashcard Form */}
            <form className="mt-4">
              <div className="mb-3">
                <label className="text-text font-semibold">Front:</label>
                <textarea
                  className="w-full mt-1 p-2 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                  value={textAreaFront}
                  onChange={(e) => setTextAreaFront(e.target.value)}
                  placeholder="Enter front side text"
                />
                {frontError && <p className="text-red-500">{frontError}</p>}
              </div>

              <div className="mb-3">
                <label className="text-text font-semibold">Back:</label>
                <textarea
                  className="w-full mt-1 p-2 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                  value={textAreaBack}
                  onChange={(e) => setTextAreaBack(e.target.value)}
                  placeholder="Enter back side text"
                />
                {backError && <p className="text-red-500">{backError}</p>}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  onClick={addFlashcard}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all"
                >
                  Add
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AddFlashCard;
