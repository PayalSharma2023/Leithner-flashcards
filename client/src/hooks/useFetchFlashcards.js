import { useState, useEffect } from "react";
import { getFlashcards } from "../utils/api";

export const useFetchFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  const fetchData = async () => {
    const data = await getFlashcards();
    setFlashcards(data);
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      const now = new Date();

      flashcards.forEach((card) => {
        const reviewTime = new Date(card.nextReview);

        // Check if current time matches review time (down to the minute)
        if (
          now.getHours() === reviewTime.getHours() &&
          now.getMinutes() === reviewTime.getMinutes()
        ) {
          fetchData(); // Refetch flashcards
          console.log(`Refetching flashcards at: ${now.toLocaleTimeString()}`);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [flashcards]);

  return { flashcards, refetch: fetchData };
};
