import { useState, useEffect } from "react";
import { getFlashcards } from "../utils/api";

export const useFetchFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  const fetchData = async () => {
    if (flashcards.length === 0) {  // Only fetch if no data
      const data = await getFlashcards();
      setFlashcards(data);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      const now = new Date();
      let shouldRefetch = false;

      flashcards.forEach((card) => {
        const reviewTime = new Date(card.nextReview);
        
        // Check if any card is due for review
        if (
          now.getHours() === reviewTime.getHours() &&
          now.getMinutes() === reviewTime.getMinutes()
        ) {
          shouldRefetch = true;
        }
      });

      if (shouldRefetch) {
        fetchData();
        console.log(`Refetching flashcards at: ${now.toLocaleTimeString()}`);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [flashcards.length]); // Depend only on flashcard length, not content

  return { flashcards, refetch: fetchData };
};
