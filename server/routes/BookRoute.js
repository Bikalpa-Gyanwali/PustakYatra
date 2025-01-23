const express = require("express");
const router = express.Router();
const {
  BookInfo,
  getBookById,
  getBooksByCategory,
} = require("../controller/BookController");
const { Searchbooks } = require("../controller/SearchController");
const { getReviews, topBooks } = require("../controller/DetailController");

// Define routes
router.get("/books", BookInfo); // Fetch all books
router.get("/books/:id", getBookById); // Fetch book by ID
router.post("/books/category", getBooksByCategory); // Fetch books by category
router.get("/searchbooks", Searchbooks); // Search books
router.get("/reviews/by-title/:title", getReviews); // Fetch reviews by title
router.get("/topbooks", topBooks); // Fetch top books

module.exports = router;
