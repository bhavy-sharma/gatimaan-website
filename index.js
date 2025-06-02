// index.js

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors'); // 🔥 Added missing import
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes.js');
const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));// Required to parse JSON request bodies
app.use('/courses', courseRoutes);

app.get('/', (req, res) => {
  res.render("layout/boilerplate.ejs");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // 🔥 Exit if DB fails to connect
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});