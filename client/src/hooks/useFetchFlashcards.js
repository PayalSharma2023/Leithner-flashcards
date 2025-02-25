import { useState, useEffect } from "react";
import { getFlashcards } from "../utils/api";

export const useFetchFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  const fetchData = async () => {
    const data = await getFlashcards();
    setFlashcards(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { flashcards, refetch: fetchData };
};
