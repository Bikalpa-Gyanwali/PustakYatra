const mongoose = require('mongoose');

// Define the schema based on the data structure
const BookSchema = new mongoose.Schema({
    ISBN: { type: String, required: true },
    BookTitle: { type: String, required: true }, // Column names adjusted to be camelCase for consistency
    BookAuthor: { type: String, required: true },
    YearOfPublication: { type: Number, required: true },
    Publisher: { type: String, required: true },
    ImageURLS: { type: String }, // Small image URL
    ImageURLM: { type: String }, // Medium image URL
    ImageURLL: { type: String } // Large image URL
});

module.exports = mongoose.model('Book', BookSchema);