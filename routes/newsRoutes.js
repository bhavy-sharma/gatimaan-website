const express = require('express');
const router = express.Router();
const News = require('../models/News');
require('dotenv').config();

// Middleware to set currentPath
router.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// GET route to view news by category
router.get('/news/:category', async (req, res) => {
    try {
        // Get the category from the URL
        const category = req.params.category;

        // Define allowed categories
        const allowedCategories = ['All', 'Admission', 'Result', 'Admit Card', 'Technology', 'Sports', 'Politics', 'Education'];

        // Validate the category
        if (!allowedCategories.includes(category)) {
            return res.redirect('/news'); // Redirect to default news page if category is invalid
        }

        // Query the database based on the category
        const query = category === 'All' ? {} : { category };

        // Fetch news items sorted by createdAt in descending order
        const newsList = await News.find(query).sort({ createdAt: -1 });

        // Render the news template with the filtered news items
        res.render('news', {
            category: category,
            newsList: newsList,
            currentPath: req.path
        });
    } catch (err) {
        console.error(`Error fetching news for category "${category}":`, err);
        res.status(500).send("Server Error");
    }
});

// GET route to add news
router.get('/add-news', (req, res) => {
    try {
        res.render('add-news', {
            currentPath: req.path
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// POST route to submit form data
router.post('/add-news', async (req, res) => {
    const { title, description, newsTitle, newsLink, category, adminpassword } = req.body;

    // Validate admin password
    if (adminpassword !== process.env.ADMIN_PASSWORD) {
        return res.render('add-news', {
            error: 'Invalid admin password',
            body: req.body
        });
    }

    try {
        // Create a new news item
        const newNews = new News({
            title,
            description,
            newsTitle,
            newsLink,
            category
        });

        // Save the news item to the database
        await newNews.save();

        // Redirect to the category-specific news page
        res.redirect(`/news/${category}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;