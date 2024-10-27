// backend/routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Score = require('../models/Score');  // Import Score model

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/submit-score', async (req, res) => {
    const { username, score } = req.body;
    console.log('Incoming score submission:', req.body); // Log the incoming request data

    if (!username || score === undefined) {
        return res.status(400).json({ message: 'Username and score are required' });
    }

    try {
        const newScore = new Score({ username, score });
        await newScore.save();
        console.log('Score saved to database:', { username, score }); // Log successful save
        res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
        console.error('Error saving score to database:', error.message);
        res.status(500).json({ message: 'Failed to save score', error: error.message });
    }
});

// Save user quiz score


module.exports = router;
