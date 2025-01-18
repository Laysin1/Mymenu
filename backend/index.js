require('dotenv').config(); // Load environment variables
console.log('Environment variables:', process.env);
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Debug: Check if MONGODB_URI is loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Connect to MongoDB
const uri = process.env.MONGODB_URI; // Get the connection string from .env

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});