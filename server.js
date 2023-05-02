require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db_connection');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// CORS
app.use(cors());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// url-encoded form data
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(express.json());

// Routes

app.use('/states/', require('./routes/api/states'));
app.use('/', require('./routes/root'));


// 404
app.all('*', (req, res) => {
  // response code
  res.status(404);
  // Send response depending on file type
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
