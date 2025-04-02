const db = require('../db');

// Check if a book object has all required fields and valid price format
function isValidBook(book) {
    const requiredFields = ['ISBN', 'title', 'Author', 'description', 'genre', 'price', 'quantity'];
    for (const field of requiredFields) {
      if (!book[field]) return false;
    }
    // Ensure price has at most two decimal places
    if (!/^\d+(\.\d{1,2})?$/.test(book.price.toString())) return false;
    return true;
  }

async function addBook(book) {
  const [rows] = await db.query('SELECT * FROM Books WHERE ISBN = ?', [book.ISBN]);
  if (rows.length > 0) {
    throw { status: 422, message: 'This ISBN already exists in the system.' };
  }

  const insertQuery = `
    INSERT INTO Books (ISBN, title, Author, description, genre, price, quantity)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  await db.query(insertQuery, [
    book.ISBN,
    book.title,
    book.Author,
    book.description,
    book.genre,
    book.price,
    book.quantity
  ]);
  book.price = Number(book.price);
  return book;
}

async function getBookByISBN(isbn) {
  const [rows] = await db.query('SELECT * FROM Books WHERE ISBN = ?', [isbn]);
  if (rows.length === 0) return null;
  rows[0].price = Number(rows[0].price);
  return rows[0];
}

async function updateBook(isbn, book) {
  const [rows] = await db.query('SELECT * FROM Books WHERE ISBN = ?', [isbn]);
  if (rows.length === 0) {
    throw { status: 404, message: 'Book not found.' };
  }
  const updateQuery = `
    UPDATE Books SET title = ?, Author = ?, description = ?, genre = ?, price = ?, quantity = ?
    WHERE ISBN = ?`;
  await db.query(updateQuery, [
    book.title,
    book.Author,
    book.description,
    book.genre,
    book.price,
    book.quantity,
    isbn
  ]);
  book.price = Number(book.price);
  return book;
}

module.exports = { isValidBook, addBook, getBookByISBN, updateBook };