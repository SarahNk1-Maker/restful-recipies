
const router = express.Router();
const { Recipe } = require('../models'); // Import your Recipe model
const withAuth = require('../utils/auth');

// Route to render the recipe page based on ID
router.get('/recipe/:id',withAuth, async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Query the database to find the recipe by its ID
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }

    // Render the Handlebars template with the retrieved recipe data
    res.render('recipe', { recipe }); // 'recipe' is the name of your Handlebars template
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
