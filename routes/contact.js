const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model'); // Your Mongoose model

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save(); // <-- Important! Are you doing this?
    res.render('layout/contact', { success: 'Your message has been sent!' });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;