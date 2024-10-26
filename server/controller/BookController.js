const { MdOutlineScheduleSend } = require('react-icons/md')
const Book = require('../models/Books')
const User = require('../models/User')

module.exports.BookInfo = async(req, res, next) => {
    try {
        const books = await Book.find().limit(12);


        // console.log('bookRoutes:', bookRoutes); // Check what is being logged here

        // Fetch all books from the database
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
}

// Controller to get a single book by ISBN
const getBookByISBN = async(req, res) => {
    const { isbn } = req.params;
    try {
        const book = await Book.findOne({ ISBN: isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the book' });
    }
};