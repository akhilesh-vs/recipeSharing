const express = require('express');
const recipe = require('../models/recipe');

const router = express.Router();

router.get('/myRecipes', async (req,res)=> {
    try{
        const username = req.session.username;

        const recipes = await recipe.find({ username: username});

        res.status(200).json(recipes);
    }
    catch(error){
        res.status(500).json({error:'An error occurred'})
    }
});

router.post('/myRecipes', async(req,res)=> {
    try{
        const {recipeId,recipeName,recipeIn,date,publicAccess} = req.body;
        const username = req.session.username;

        const newRecipe = new recipe({
            username,
            recipeId,
            recipeName,
            recipeIn,
            date,
            publicAccess
        })

        await newRecipe.save();

        res.status(201).json({
            message:'Recipe created successfully'
        })
    }
    catch(error){
        res.status(500).json({
            error:`An error occurred while adding newRecipe - ${error}`
        })
    }

})

router.put('/myRecipes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params;
      const { recipeName, recipeIn, date, publicAccess } = req.body;
  
     
      const updatedRecipe = await recipe.findOneAndUpdate(
        { recipeId: recipeId },
        { recipeName, recipeIn, date, publicAccess },
        { new: true }
      );
  
      if (!updatedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.status(200).json({
        message: 'Recipe updated successfully',
        recipe: updatedRecipe,
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the recipe' });
    }
  });


  router.delete('/myRecipes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params;
  
      const deletedRecipe = await recipe.findOneAndDelete({recipeId});
  
      if (!deletedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the recipe' });
    }
  });
  
  

module.exports = router;