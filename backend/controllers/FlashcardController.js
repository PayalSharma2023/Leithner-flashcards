const Flashcard = require("../models/Flashcard");

// Create a new flashcard
exports.createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newCard = new Flashcard({ question, answer });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: "Failed to create flashcard" });
  }
};

// Get all flashcards
exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
};

// Update flashcard (move to next box or reset)
exports.updateFlashcard = async (req, res) => {
  try {
    const { correct } = req.body;
    const card = await Flashcard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ error: "Flashcard not found" });
    }

    if (correct) {
      card.box = Math.min(3, card.box + 1); // Move to next box
    } else {
      card.box = 1; // Reset to Box 1
    }

    card.nextReview = new Date(Date.now() + card.box * 24 * 60 * 60 * 1000); // Spaced repetition
    await card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to update flashcard" });
  }
};

// Delete flashcard
exports.deleteFlashcard = async (req, res) => {
  try {
    const card = await Flashcard.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Flashcard not found" });
    }
    res.json({ message: "Flashcard deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete flashcard" });
  }
};

exports.getDueFlashcards = async (req, res) => {
  try {
    const today = new Date();
    
    // Find flashcards where nextReview date is today or earlier
    const flashcards = await Flashcard.find({ nextReview: { $lte: today } }).sort({ nextReview: 1 });

    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch due flashcards" });
  }
};

