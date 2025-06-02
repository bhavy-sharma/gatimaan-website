// ./models/courses.model.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  longDesciption:{
    type: String,
    required:true
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema, 'Courses');