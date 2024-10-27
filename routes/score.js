// backend/routes/score.js
const express = require('express');
const Score = require('../models/Score');

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, score } = req.body;

    try {
        const newScore = new Score({ username, score });
        await newScore.save();
        res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save score', error: error.message });
    }
});

module.exports = router;
