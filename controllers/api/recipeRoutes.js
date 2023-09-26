const router = require('express').Router();
const { Recipe } = require('../../models'); // Import your Recipe model
const withAuth = require('../../utils/auth'); //Import our utility function, why this one need specify file instead of just folder?

// Route to create a new recipe (POST)
router.post('/', withAuth, async (req, res) => {
  try {
    // Extract recipe data from the request body

    const { title, tag, description, ingredients, instructions, prep_time, cook_time, user_id } = req.body;
    console.log("tag", tag)
console.log(req.body)
    // Create a new recipe in the database
    const newRecipe = await Recipe.create({
      title,
      tag,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      user_id: req.session.user_id,
    });

    // Send a success response.
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a recipe based on ID 
router.delete('/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Query the database to find the recipe by its ID
    const recipe = await Recipe.findByPk(recipeId);
    console.log(recipe)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Delete the recipe from the database
    await recipe.destroy();

    // Send a success response or a message indicating successful deletion
    res.status(204).send(); // 204 No Content status for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

