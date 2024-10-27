// backend/routes/quiz.js
const express = require('express');
const Question = require('../models/Question');  // Import your Question model
const router = express.Router();

// Route to get all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();  // Fetch all questions from the database
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Failed to fetch questions' });
    }
});

module.exports = router;
