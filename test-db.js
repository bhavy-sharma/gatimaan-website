// test-db.js
const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const News = mongoose.model('News', new mongoose.Schema({
            title: String,
            description: String,
            newsTitle: String,
            newsLink: String,
            category: String,
            createdAt: Date
        }));

        const results = await News.find({ category: 'Admit Card' });
        console.log("Admit Card News:", results);

        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

testConnection();