const { MdOutlineScheduleSend } = require('react-icons/md')
const Book = require('../models/Books')
const User = require('../models/User')
const mongoose = require('mongoose');
const BookDetail = require('../models/Detail')
    // module.exports.BookInfo = async(req, res, next) => {
    //     try {
    //         const books = await Book.find().limit(12);


//         // console.log('bookRoutes:', bookRoutes); // Check what is being logged here

//         // Fetch all books from the database
//         res.status(200).json(books);
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         res.status(500).json({ message: 'Error fetching books' });
//     }
// }
module.exports.BookInfo = async(req, res, next) => {
    try {
        // Fetch 12 random books from the database
        const books = await Book.aggregate([{ $sample: { size: 12 } }]);

        // Return the random books
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
}



/// Model for the additional collection

// exports.getBookById = async(req, res, next) => {
//     const { id } = req.params;

//     // Validate the ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid book ID format' });
//     }

//     console.log(`Fetching book with ID: ${id}`);

//     try {
//         // Fetch the book and join additional info using the BookTitle
//         const bookData = await Book.aggregate([
//             { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Correctly instantiate ObjectId with new
//             {
//                 $lookup: {
//                     from: 'bookInfos', // Name of the secondary collection
//                     localField: 'BookTitle', // Field in Book collection
//                     foreignField: 'Title', // Field in BookInfo collection
//                     as: 'additionalInfo' // Name of the field to store the additional info
//                 }
//             },
//             {
//                 $unwind: {
//                     path: "$additionalInfo",
//                     preserveNullAndEmptyArrays: true // Keep books that have no additional info
//                 }
//             },
//             {
//                 $project: {
//                     BookTitle: 1,
//                     BookAuthor: 1,
//                     YearOfPublication: 1,
//                     Publisher: 1,
//                     ImageURLS: 1,
//                     "additionalInfo.description": 1,
//                     "additionalInfo.authors": 1,
//                     "additionalInfo.publisher": 1,
//                     "additionalInfo.publishedDate": 1,
//                     "additionalInfo.categories": 1
//                 }
//             }
//         ]);

//         if (bookData.length === 0) {
//             return res.status(404).json({ message: 'Book not found' });
//         }

//         res.json(bookData[0]); // Return the first matched book with additional info
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

exports.getBookById = async(req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid book ID format' });
    }
    console.log(`Fetching book with ID: ${id}`);

    try {
        const book = await BookDetail.findById(id); // Change to BookInfo
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};