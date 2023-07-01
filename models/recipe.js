const mongoose = require('mongoose')
const express = require('express')

const ingredientsSchema = new mongoose.Schema({

    ingredientName : {type : String},

    ingredientQuantity : {type : String},
    
});


const recipeSubSchema = new mongoose.Schema({
  ingredients:{
    type:[ingredientsSchema]
  },
  Directions: {
    type: String,
  }, 
});



const recipe = new mongoose.Schema({

    username: { type: String, required: true },

    recipeId: { type: Number, required: true, unique:true },

    recipeName: { type: String, required: true },

    recipeIn: { type: recipeSubSchema },

    date: { type: String },

    publicAccess: { type: Boolean, required: true }

  });






const recipeSchema = mongoose.model('recipeSchema',recipe);

module.exports = recipeSchema;

