const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const dbURI = 'your_mongo_db_connection_string'; // Replace with your MongoDB connection string

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', require('./routes/auth')); // Auth routes
app.use('/api/bookings', require('./routes/bookings')); // Bookings routes

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
