const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Add a new book
router.post('/', bookController.addBook);

// Retrieve book by ISBN (supports two path formats)
router.get('/isbn/:isbn', bookController.getBookByISBN);
router.get('/:isbn', bookController.getBookByISBN);

// Update book information (PUT /books/:isbn)
router.put('/:isbn', bookController.updateBook);

module.exports = router;
