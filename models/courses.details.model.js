const mongoose = require('mongoose');

const Course_details = new mongoose.Schema({
  title: String,
  shortDescription: String,
  longDescription: String,
  imageUrl: String,
  subjects: { 
    type: [String], // Must be an array of strings
    default: []     // Optional: fallback to empty array
  },
  whatsappNumber: String,
  admissionProcess: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course_details', Course_details);