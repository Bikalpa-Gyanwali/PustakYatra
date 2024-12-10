// Search books based on title
const BookInfo = require('../models/Detail');
const mongoose = require('mongoose');
module.exports.Searchbooks = async(req, res, next) => {
    try {

        const { query, limit = 10 } = req.query;
        console.log(req.query) // `query` is the search term
        if (typeof query !== 'string' || query.trim() === '') {
            return res.status(400).json({ message: 'Invalid query parameter' });
        }

        const books = await BookInfo.find({
            Title: { $regex: query, $options: 'i' } // Case-insensitive search using Title
        }).limit(parseInt(limit, 10));
        console.log('hello here')

        res.status(200).json(books);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ message: 'Error searching books' });
    }
};

/*tracts the query parameter (the search term) 
and the limit parameter
using a case-insensitive regular expression ($regex with the i option). 
This means that it will match titles regardless of the case (e.g., "harry potter" 
will match "Harry Potter").

 */