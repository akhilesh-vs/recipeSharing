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
    user_id: {
        type:Number,
        required: [true,'Enter ID'],
        unique: true
    },
    RecipeId: {
        type:Number,
        required: true
    },
    RecipeName : {
        required : true ,
    },
    Recipe:{
        type:recipeSubSchema
    },
    Date:{
        type:String
    },
    Public_Access:{
        type:Boolean,
        required:true
    }
})


// const userSchema = new mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     user_id: {
//         type:Number,
//         required: [true,'Enter ID'],
//         unique: true
//     }
// })

const recipeSchema = mongoose.model('recipeSchema',recipe);

module.exports = recipeSchema;

