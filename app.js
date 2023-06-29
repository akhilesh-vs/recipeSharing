// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');

const app = express();

// Connect to MongoDB Atlas (replace <YOUR_CONNECTION_STRING> with your actual connection string)
mongoose.connect('mongodb+srv://avscentaur:avscentaur@recipesharing.8ikys1i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
    session({
      secret: 'mysecret', // Change this to a secure secret in production
      resave: false,
      saveUninitialized: false,
    })
  );
  

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});