const express = require('express');
const Course = require('../models/courses.model'); // Make sure path is correct
const router = express.Router();

// POST /courses - Add new course (already working)
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
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses from MongoDB
    res.render('views/components/courses', { courses }); // This will render views/courses.ejs
  } catch (err) {
    console.error(err);   
    res.status(500).send('Server Error');
  }
});

// GET /courses/:id - View single course (fix: use EJS or HTML template instead of res.render with string)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found');

    // Better: render a view like course-detail.ejs instead of sending raw HTML
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