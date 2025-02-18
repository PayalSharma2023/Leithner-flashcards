import { useFetchFlashcards } from "../hooks/useFetchFlashcards";
import FlashcardList from "../components/flashcard/FlashcardList";
import ProgressBar from "../components/flashcard/ProgressBar";
import { updateFlashcard } from "../utils/api";

const Study = () => {
  const flashcards = useFetchFlashcards();
  
  // Ensure flashcards is an array before accessing it
  if (!Array.isArray(flashcards)) {
    return <div>Loading...</div>; // or any other loading state
  }

  const dueFlashcards = flashcards.filter(card => new Date(card.nextReview) <= new Date());
  console.log(flashcards)

  const handleUpdateCard = (cardId) => {
    // Pass card ID to updateFlashcard for the specific card
    updateFlashcard(cardId);
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Flashcard App</h1> */}
      <ProgressBar dueFlashcards={dueFlashcards.length} totalFlashcards={flashcards.length} />
      <FlashcardList flashcards={dueFlashcards} updateCard={handleUpdateCard} />
    </div>
  );
};

export default Study;
