const router = require("express").Router();
const { Recipe, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(recipes);

    // Choose one of the recipes at random.
    const recipe_id = recipes[Math.floor(Math.random() * recipes.length)].id;
    const chosenRecipe = recipes[recipe_id - 1];

    // Pass serialized data and session flag into template
    res.render("homepage", {
      ...chosenRecipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(recipes);
    // Pass serialized data and session flag into template
    res.render("recipes", {
      ...chosenRecipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the recipe page based on ID
router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const recipe = recipeData.get({ plain: true });

    res.render("recipe", {
      ...recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  try {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      console.log("User is already logged in. Redirecting to /profile.");
      res.redirect("/profile");
      return;
    }
    console.log("rendering login page");
    res.render("login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route handler to get uses profile data and render their profile page.
// Use customer middleware "withAuth" to restrict access to logged-in users only.
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID and include that user's recipes.
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Recipe }],
    });

    //Serialize the User and Recipe data.
    const userRecipes = userData.get({ plain: true });

    //Use the serialized data to render the user's profile page.
    console.log(userRecipes);
    res.render("chef", {
      ...userRecipes,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
