const express = require('express')
const router = express.Router()
const { BookInfo } = require('../controller/BookController')

router.get('/books', BookInfo)
module.exports = router;