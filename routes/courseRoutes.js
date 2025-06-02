// routes/courseRoutes.js

const express = require('express');
const Course = require('../models/courses.model');
const router = express.Router();

// POST /courses - Add new course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /courses - Render courses.ejs with all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses
    res.render('components/courses', { courses }); // Make sure views/courses.ejs exists
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET /courses/:id - View single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found');

    res.send(`
      <h1>${course.title}</h1>
      <p>${course.longDescription}</p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;