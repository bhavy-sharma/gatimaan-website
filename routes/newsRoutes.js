// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const News = require('../models/News');
require('dotenv').config();

// Add this before your routes
router.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

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
    const { title, description, newsTitle, newsLink, category , adminpassword } = req.body;

      if(adminpassword !== process.env.ADMIN_PASSWORD){
            return res.render('add-news', {
                error: 'Invalid admin password',
                body: req.body
            });
        }

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
router.get('/news', async (req, res) => {
    try {
        // Get all news items or filter by category if provided
        const category = req.query.category || 'All';
        const query = category === 'All' ? {} : { category };
        
        const newsList = await News.find(query).sort({ createdAt: -1 });
        res.render('news', { 
            category: category,
            newsList: newsList,
            currentPath: req.path  // Add this line
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router; // ✅ Correct export