// index.js

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes');
const newsRouter = require('./routes/newsRoutes');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/courses', courseRoutes);
app.use('/', newsRouter);

// Home route
app.get('/', async (req, res) => {
  try {
    const News = require('./models/News');
    const Course = require('./models/courses.model');

    const [admitCards, admissions, results, courses] = await Promise.all([
      News.find({ category: 'Admit Card' }).limit(5),
      News.find({ category: 'Admission' }).limit(5),
      News.find({ category: 'Result' }).limit(5),
      Course.find()
    ]);

    res.render('layout/boilerplate', {
      admitCards,
      admissions,
      results,
      courses
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get('/layout/about' , (req, res) => {
  res.render('layout/about');
})

app.get('/layout/contact' , (req, res) => {
  res.render('layout/contact');
})

app.get('/layout/courses', async (req, res, next) => {
  try {
    const Course = require('./models/courses.model');
    const courses = await Course.find();
    res.render('layout/courses-page.ejs', { courses });
  } catch (err) {
    next(err);
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Start Server
app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});