// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Connect to MongoDB Atlas (replace <YOUR_CONNECTION_STRING> with your actual connection string)
mongoose.connect('mongodb+srv://avscentaur:avscentaur@recipesharing.8ikys1i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(
    session({
      secret: 'mysecret', // Change this to a secure secret in production
      resave: false,
      saveUninitialized: false,
    })
  );
  

// Middleware
app.use(express.json());


const requireLogin = (req,res,next) => {
    if(!req.session.username) {
        res.status(401).json({
            "Error":"Unauthorized - Create Account",
        });
    }
    next();
}


// Routes
app.use('/api/users', userRoutes);


app.get('/dashboard', requireLogin, (req,res)=>{
    res.status(200).json({
        "Success":"Welcome to the dashboard",
    });
})

app.use('/dashboard', recipeRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});