const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Request attempted")
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.session.username = user.username;

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/logout',(req,res)=> {
    req.session.destroy((err)=>{
        if(err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        res.send("Logged out successfully");
    })
})

module.exports = router;
