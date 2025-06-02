// ./routes/courseRoutes.js

const express = require('express');
const Course = require('../models/courses.model');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;