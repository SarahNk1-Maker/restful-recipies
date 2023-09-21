const User = require('./User');
const Recipe = require('./Recipe');

User.hasmany(Recipe, {
    forigenKey: 'user-id',
    onDelete: 'CASCADE'
})

Recipe.belongsTo(User, {
    forigenKey: 'user-id'
});

module.exports = { User, Recipe }