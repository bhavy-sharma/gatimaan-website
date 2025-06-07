const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    newsTitle: {
        type: String,
        required: true
    },
    newsLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Admit Card', 'Admission', 'Result'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);