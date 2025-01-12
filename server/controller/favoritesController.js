// backend/controllers/favoritesController.js
const Favorite = require('../models/Favorite');

exports.addFavorite = async (req, res) => {
    const { userId, book } = req.body;
    try {
        const favorite = new Favorite({ userId, book });
        await favorite.save();
        res.status(200).json({ success: true, favorite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFavorites = async (req, res) => {
    const { userId } = req.params;
    try {
        const favorites = await Favorite.find({ userId });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
