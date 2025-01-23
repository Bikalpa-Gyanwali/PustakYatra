const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controller/wishlistController");

router.post("/add", authenticateToken, addToWishlist);
router.get("/", authenticateToken, getWishlist);
router.delete("/:title", authenticateToken, removeFromWishlist);

module.exports = router;