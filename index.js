// index.js
const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes');
const newsRouter = require('./routes/newsRoutes'); // ✅ Import router

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/courses', courseRoutes);
app.use('/', newsRouter); // ✅ Use the imported router instance

// Home route
app.get('/', async (req, res) => {
  try {
    const News = require('./models/News');
    const admitCards = await News.find({ category: 'Admit Card' }).limit(5);
    const admissions = await News.find({ category: 'Admission' }).limit(5);
    const results = await News.find({ category: 'Result' }).limit(5);

    res.render('layout/boilerplate', {
      admitCards,
      admissions,
      results
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
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



app.get('/add-news', (req, res) => {
  res.render('add-news.ejs'); 
});


// Start Server
app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});