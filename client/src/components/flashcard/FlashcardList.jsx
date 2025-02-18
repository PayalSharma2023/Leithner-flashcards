import Flashcard from "./Flashcard";

const FlashcardList = ({ flashcards, updateCard }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flashcards.map((card) => (
        <Flashcard key={card._id} card={card} updateCard={updateCard} />
      ))}
    </div>
  );
};

export default FlashcardList;
