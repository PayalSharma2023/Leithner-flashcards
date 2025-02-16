const express = require("express");
const router = express.Router();
const {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
  getDueFlashcards
} = require("../controllers/FlashcardController");

router.post("/", createFlashcard);
router.get("/", getFlashcards);
router.get("/due", getDueFlashcards); 
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashcard);

module.exports = router;
