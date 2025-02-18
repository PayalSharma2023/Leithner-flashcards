// import Flashcards from "../components/flashcard/flashcards";
import { useFetchFlashcards } from "../hooks/useFetchFlashcards";
import FlashcardList from "../components/flashcard/FlashcardList";
import ProgressBar from "../components/flashcard/ProgressBar";

const Study = () => {
  const flashcards = useFetchFlashcards();
  const dueFlashcards = flashcards.filter(card => new Date(card.nextReview) <= new Date());
  console.log(flashcards)

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Flashcard App</h1> */}
      <ProgressBar dueFlashcards={dueFlashcards.length} totalFlashcards={flashcards.length} />
      <FlashcardList flashcards={dueFlashcards} />
    </div>
  );
};

export default Study;
