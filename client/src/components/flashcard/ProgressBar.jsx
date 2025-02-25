const ProgressBar = ({ dueFlashcards, totalFlashcards }) => {
    return (
      <div className="w-full bg-gray-300 rounded-full mb-4">
        <div
          className="bg-blue-500 text-xs font-medium text-white text-center px-4 py-1 leading-none rounded-full"
          style={{ width: `${(dueFlashcards / totalFlashcards) * 100 + 4}%` }}
        >
          {dueFlashcards}/ {totalFlashcards} due today
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  