const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

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
    res.render('recipe', { recipe }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/login', withAuth, (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    } 
    
   res.render('login');
  });
  
// Route handler to get uses profile data and render their profile page. 
// Use customer middleware "withAuth" to restrict access to logged-in users only.
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID and include that user's recipes.
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    //Serialize the User and Recipe data.
    const user = userData.get({ plain: true });

    //Use the serialized data to render the user's profile page.
    res.render('chef', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;