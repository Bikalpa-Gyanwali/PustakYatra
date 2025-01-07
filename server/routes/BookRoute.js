const express = require('express')
const router = express.Router()
const { BookInfo } = require('../controller/BookController')
const { Searchbooks } = require('../controller/SearchController')
const { getBookById } = require('../controller/BookController')
const { getBooksByCategory } = require('../controller/BookController')

const { getReviews, topBooks } = require('../controller/DetailController')
router.get('/books', BookInfo)
router.get('/searchbooks', Searchbooks)
router.get('/books/:id', getBookById)
router.get('/reviews/by-title/:title', getReviews)
router.get('/topbooks', topBooks)
router.post('/books/category', getBooksByCategory);



// router.get('/books/:id', getBookDetails)

module.exports = router;