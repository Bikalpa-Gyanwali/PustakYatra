// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    // id: { type: String, required: true }, // Unique identifier for the review
    Title: { type: String, required: true }, // Title of the book
    user_id: { type: String, required: true }, // ID of the user who wrote the review
    profileName: { type: String, required: true }, // Name of the reviewer
    review_score: { type: Number, required: true, min: 1, max: 5 }, // Review score
    review_text: { type: String, required: true }, // Full review text
    review_summary: { type: String, required: true }, // Summary of the review
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;