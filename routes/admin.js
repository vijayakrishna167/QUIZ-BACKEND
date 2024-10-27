const express = require('express');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const Question = require('../models/Question');  // Import the Question model
const router = express.Router();

// Admin registration route (existing)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    admin = new Admin({ username, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully', username: admin.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', isAdmin: true, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new question
router.post('/add-question', async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, correctAnswer } = req.body;

    // Create a new question object
    const newQuestion = new Question({
      question,
      options: [option1, option2, option3, option4],
      correctAnswer
    });

    // Save the question to the database
    await newQuestion.save();

    res.status(200).json({ message: 'Question added successfully' });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Failed to add question' });
  }
});

module.exports = router;
