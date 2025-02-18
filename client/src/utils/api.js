import axios from "axios";

const API_URL = "http://localhost:3000/flashcards";

export const getFlashcards = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return [];
  }
};

export const updateFlashcard = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      return [];
    }
  };
  
