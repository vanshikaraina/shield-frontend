const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
// const googleRoutes = require('./routes/googleRoutes');


dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Routes
const issueRoutes = require('./routes/issueRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Add feedback routes
const sensitiveRoutes = require('./routes/sensitiveRoutes');
// app.use('/api/google', googleRoutes);

app.use('/api/issues', issueRoutes);
app.use('/api/feedback', feedbackRoutes); // Use feedback routes for /api/feedback
app.use('/api/sensitive', sensitiveRoutes); // Ensure sensitiveRoutes are added

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Safe Streets Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
