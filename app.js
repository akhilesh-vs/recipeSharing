const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const recipeRoutes = require('./routes/recipeRoutes');

const recipe = require('./models/recipe');

const app = express();
const cors = require('cors');
app.use(cors());

// Connect to MongoDB Atlas (replace <YOUR_CONNECTION_STRING> with your actual connection string)
mongoose.connect('mongodb+srv://luffy:luffy@recipenew.ovgxf5p.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(
    session({
      secret: 'mysecret', 
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



app.use('/api/users', userRoutes);


// app.get('/dashboard', requireLogin, (req,res)=>{
//     res.status(200).json({
//         "Success":"Welcome to the dashboard",
//     });
// })

app.get('/dashboard', async (req,res)=> {
  try{
      
      const recipes = await recipe.find({publicAccess:true});

      res.status(200).json(recipes);
  }
  catch(error){
      res.status(500).json({error:'An error occurred while fetching all data'})
  }
});


app.use('/dashboard', recipeRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});