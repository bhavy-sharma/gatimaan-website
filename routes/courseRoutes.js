const express = require('express');
const Course = require('../models/courses.model');
const router = express.Router();

// ✅ Specific routes first

// GET /courses/admin/add — Show add course form
router.get('/admin/add', (req, res) => {
  res.render('admin/add-courses', { error: null, success: null });
});

// POST /courses/admin/add — Handle form submission
router.post('/admin/add', async (req, res) => {
  const {
    imageUrl = '',
    title = '',
    shortDescription = '',
    longDesciption = '',
    adminPassword = ''
  } = req.body;


  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.render('admin/add-courses', {
      error: 'Invalid admin password',
      body: req.body
    });
  }

  if (!imageUrl || !title || !shortDescription || !longDesciption) {
    return res.render('admin/add-courses', {
      error: 'All fields are required',
      body: req.body
    });
  }

  try {
    const newCourse = new Course({ imageUrl, title, shortDescription, longDesciption });
    await newCourse.save();

    res.render('admin/add-courses', {
      success: 'Course added successfully!',
      body: {}
    });
  } catch (error) { // 🔥 Handle errors here instead of inside try/catch block
    console.error(error); // 🔥 Log the error for debugging
    res.status(500).send('Server Error');
  }
});

  // if (error.name === 'ValidationError') {
  //     const errors = {};
  //     for (let [key, value] of Object.entries(err.errors)) {
  //       errors[key] = value.message;
  //     }

  //     return res.render('admin/add-courses', {
  //       error: 'Validation failed',
  //       errors: errors,
  //       body: req.body
  //     });
  //   }

// 🟡 General routes

// GET /courses — Render all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.render('components/courses', { courses });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ⚠️ This must come LAST
// GET /courses/:id — View single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found');

    res.render('layout/course-view-page', { course, currentPath: req.path });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// GET /courses/admin/edit/:id — Show edit form
router.get('/admin/edit/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found');

    res.render('admin/edit-course', { course, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST /courses/admin/edit/:id — Handle form submission
router.post('/admin/edit/:id', async (req, res) => {
  const {
    imageUrl = '',
    title = '',
    shortDescription = '',
    longDesciption = '',
    adminPassword = ''
  } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    const course = await Course.findById(req.params.id);
    return res.render('admin/edit-course', {
      course,
      error: 'Invalid admin password',
    });
  }

  if (!imageUrl || !title || !shortDescription || !longDesciption) {
    const course = await Course.findById(req.params.id);
    return res.render('admin/edit-course', {
      course,
      error: 'All fields are required',
    });
  }

  try {
    await Course.findByIdAndUpdate(req.params.id, {
      imageUrl,
      title,
      shortDescription,
      longDesciption
    });

    res.redirect('/'); // Or redirect to `/courses/${req.params.id}` if you want
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;