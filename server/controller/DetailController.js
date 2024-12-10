const BookDetail = require('../models/Detail')
const Review = require('../models/Reviews')

const mongoose = require('mongoose');

exports.getBookDetails = async(req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid book ID format' });
    }
    console.log(`Fetching book with ID: ${id}`);

    try {
        const book = await BookDetail.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', erroe: error.message });
    }
};

exports.getReviews = async(req, res, next) => {
    const { title } = req.params;

    try {
        const reviews = await Review.find({
            Title: { $regex: new RegExp(title, "i") } // Case-insensitive match
        });
        console.log("Reviews fetched from DB:", reviews);


        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
}

exports.topBooks = async(req, res) => {
    try {
        console.log('Trying to fetch top books')
        const topBooks = await Review.aggregate([{
                $group: {
                    _id: "$Title", // Group by title
                    averageRating: { $avg: "$review_score" }, // Calculate average rating
                    reviewCount: { $sum: 1 }, // Count the number of reviews
                },
            },
            { $sort: { averageRating: -1, reviewCount: -1 } }, // Sort by rating, then review count
            { $limit: 10 }, // Limit to top 10 books
        ]);
        res.json(topBooks);
    } catch (error) {
        console.error("Error fetching top books:", error);
        res.status(500).json({ message: "Error fetching top books" });
    }

}