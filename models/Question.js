const mongoose = require('mongoose');

// Define schema for a question
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String], // Array of strings for options
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

// Create Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
