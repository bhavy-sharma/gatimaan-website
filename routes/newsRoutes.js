// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const News = require('../models/News');


router.get('/add-news', (req, res) => {
    try {
        res.render('add-news');
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// POST route to submit form data
router.post('/add-news', async (req, res) => {
    const { title, description, newsTitle, newsLink, category } = req.body;

    try {
        const newNews = new News({
            title,
            description,
            newsTitle,
            newsLink,
            category
        });

        await newNews.save();
        res.redirect(`/news/${category}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// GET route to view news by category
router.get('/news/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const newsList = await News.find({ category }).sort({ createdAt: -1 });
        res.render('news', { category, newsList });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router; // ✅ Correct export