import { useState } from "react";

const Flashcard = ({ card, updateCard }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border p-4 min-h-[20vh] rounded-lg shadow-md bg-white">
      <p className="text-xl font-semibold">{showAnswer ? card.answer : card.question}</p>
      <button onClick={() => setShowAnswer(!showAnswer)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {showAnswer && (
        <div className="mt-2">
          <button onClick={() => updateCard(card._id, true)} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">
            Got it right
          </button>
          <button onClick={() => updateCard(card._id, false)} className="px-4 py-2 bg-red-500 text-white rounded">
            Got it wrong
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
