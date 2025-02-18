import { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";


function Cards() {
  
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
      
    </div>
  );
}

export default Cards;
