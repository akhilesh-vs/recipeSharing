const express = require('express');

const app = express();

const router = express.Router();

app.use(express.json());

app.get('/users', (req, res) => {
  // get all users
});

app.post('/users', (req, res) => { // login
  // get all users
});

app.post('/user/:id',(req,res) => {
  // create recipe
})

app.get('/recipes', (req, res) => { 
  // list latest recipes
});

app.get('/users/:id/recipe', (req,res) => {
  // get recipe of a particular user
})

app.put('/users/:id/recipe', (req,res) => {
  // update recipe
})

app.delete('/users/:id/recipe', (req,res) => {
  // delete recipe
})
