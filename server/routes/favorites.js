// backend/routes/favorites.js
const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites } = require('../controllers/favoritesController');

// Add book to favorites
router.post('/add', addFavorite);

// Get all favorites
router.get('/:userId', getFavorites);

module.exports = router;
