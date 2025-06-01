const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('layout/index');
});


router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;
