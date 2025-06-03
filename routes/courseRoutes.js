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
// router.get('/:id', async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).send('Course not found');

//     res.send(`
//       <h1>${course.title}</h1>
//       <p>${course.longDesciption}</p>
//     `);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// Route to show course by ID
router.get('/courses/:id', async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    res.render('layout/courses-details', { course }); // Make sure you have 'course-details.ejs' view
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;