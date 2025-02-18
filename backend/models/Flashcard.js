const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  box: { type: Number, default: 1 }, // Leitner Box (1-3)
  nextReview: { type: Date, default: Date.now }, // Spaced repetition
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
