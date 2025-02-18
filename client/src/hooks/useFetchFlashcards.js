import { useState, useEffect } from "react";
import { getFlashcards } from "../utils/api";

export const useFetchFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFlashcards();
      setFlashcards(data);
    };
    fetchData();
  }, []);

  return flashcards;
};
