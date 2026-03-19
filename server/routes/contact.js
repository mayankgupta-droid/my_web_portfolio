const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/contact - Submit form data
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ message: 'Contact submitted successfully!', id: result.insertId });
  } catch (err) {
    console.error('Error inserting data into MySQL:', err);
    res.status(500).json({ error: 'Database error occurred. Please try again.' });
  }
});

module.exports = router;
