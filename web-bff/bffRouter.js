require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE = process.env.URL_BASE_BACKEND_SERVICES;

// Get book by ISBN
router.get('/books/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BASE}/books/${req.params.isbn}`);
    res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Backend error';
    res.status(status).json({ message });
  }
});

// Add new book
router.post('/books', async (req, res) => {
  try {
    const response = await axios.post(`${BASE}/books`, req.body);
    res.status(response.status).location(response.headers.location).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Backend error';
    res.status(status).json({ message });
  }
});

// Update book
router.put('/books/:isbn', async (req, res) => {
  try {
    const response = await axios.put(`${BASE}/books/${req.params.isbn}`, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Backend error';
    res.status(status).json({ message });
  }
});

// Get customer by ID
router.get('/customers/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BASE}/customers/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Backend error';
    res.status(status).json({ message });
  }
});

// Get customer by userId query
router.get('/customers', async (req, res) => {
  try {
    const response = await axios.get(`${BASE}/customers`, { params: req.query });
    res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Backend error';
    res.status(status).json({ message });
  }
});

// Add customer
router.post('/customers', async (req, res) => {
  try {
    const response = await axios.post(`${BASE}/customers`, req.body);
    res.status(response.status).location(response.headers.location).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || 'Backend error';
    res.status(status).json({ message });
  }
});

module.exports = router;
