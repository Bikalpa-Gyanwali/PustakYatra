const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { addFavorite, getFavorites, removeFavorite } = require("../controller/favoritesController");

router.post("/add", authenticateToken, addFavorite);
router.get("/", authenticateToken, getFavorites);
router.delete("/:isbn", authenticateToken, removeFavorite);

module.exports = router;