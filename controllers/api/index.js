const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./recipeRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;