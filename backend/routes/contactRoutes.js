// backend/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Contact message saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

module.exports = router;
