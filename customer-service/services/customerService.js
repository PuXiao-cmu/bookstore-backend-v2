const db = require('../db');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidState(state) {
  return /^[A-Z]{2}$/.test(state);
}

async function addCustomer(c) {
  const [rows] = await db.query('SELECT * FROM Customers WHERE userId = ?', [c.userId]);
  if (rows.length > 0) {
    throw { status: 422, message: 'This user ID already exists in the system.' };
  }

  const result = await db.query(
    `INSERT INTO Customers (userId, name, phone, address, address2, city, state, zipcode)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [c.userId, c.name, c.phone, c.address, c.address2 || null, c.city, c.state, c.zipcode]
  );
  return { id: result[0].insertId, ...c };
}

async function getCustomerById(id) {
  const [rows] = await db.query('SELECT * FROM Customers WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
}

async function getCustomerByUserId(userId) {
  const [rows] = await db.query('SELECT * FROM Customers WHERE userId = ?', [userId]);
  return rows.length > 0 ? rows[0] : null;
}

module.exports = {
  isValidEmail,
  isValidState,
  addCustomer,
  getCustomerById,
  getCustomerByUserId
};
