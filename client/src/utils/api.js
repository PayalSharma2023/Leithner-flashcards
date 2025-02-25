import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URI;

export const getFlashcards = async () => {
  try {
    const response = await axios.get(`${API_URL}/flashcards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return [];
  }
};

export const updateFlashcard = async (id, correct) => {
    try {
      const response = await axios.put(`${API_URL}/flashcards/${id}`, {correct});
      return response.data;
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      return [];
    }
  };
  
