const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user'); // Combined single user routes import
const quizRoutes = require('./routes/quiz');  
const scoreRoutes = require('./routes/score');
require('dotenv').config();
const cors = require('cors');

// Initialize express app
const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes); // User routes
app.use('/api/quiz', quizRoutes);  
app.use('/api/score', scoreRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
