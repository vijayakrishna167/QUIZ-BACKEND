// routes/admin.js
const express = require('express');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Question=require("../models/Question")

// Admin registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin and save to database
    const newAdmin = new Admin({ username, email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
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
    console.error('Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

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
