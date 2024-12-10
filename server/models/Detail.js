const mongoose = require('mongoose');

// Define the BookInfo schema
const BookInfoSchema = new mongoose.Schema({
    Title: { type: String, required: true }, // Title of the book
    description: { type: String }, // Description of the book
    authors: [{ type: String }], // Array of authors
    image: { type: String }, // Image URL for the book cover
    previewLink: { type: String }, // Link to preview the book
    publisher: { type: String }, // Publisher of the book
    publishedDate: { type: Date }, // Date when the book was published
    infoLink: { type: String }, // Link for more info about the book
    categories: [{ type: String }] // Array of categories
});

// Export the BookInfo model
module.exports = mongoose.model('Info', BookInfoSchema);