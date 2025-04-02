const bookService = require('../services/bookService');

exports.addBook = async (req, res) => {
  const book = req.body;

  if (!bookService.isValidBook(book)) {
    return res.status(400).json({ message: 'Invalid or missing fields.' });
  }

  try {
    const createdBook = await bookService.addBook(book);
    res.status(201)
      .location(`/books/${createdBook.ISBN}`)
      .json(createdBook);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
  }
};

exports.getBookByISBN = async (req, res) => {
  const isbn = req.params.isbn;

  if (!isbn) {
    return res.status(400).json({ message: 'ISBN is required.' });
  }

  try {
    const book = await bookService.getBookByISBN(isbn);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateBook = async (req, res) => {
  const isbn = req.params.isbn;
  const book = req.body;

  const requiredFields = ['ISBN', 'title', 'Author', 'description', 'genre', 'price', 'quantity'];
  for (const field of requiredFields) {
    if (book[field] === undefined || book[field] === null) {
      return res.status(400).json({ message: 'Invalid or missing fields.' });
    }
  }

  if (isbn !== book.ISBN) {
    return res.status(400).json({ message: 'ISBN in URL and body do not match.' });
  }

  if (!/^\d+(\.\d{1,2})?$/.test(book.price.toString())) {
    return res.status(400).json({ message: 'Invalid price format.' });
  }

  try {
    const updatedBook = await bookService.updateBook(isbn, book);
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
  }
};