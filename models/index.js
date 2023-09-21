const User = require('./User');
const Recipe = require('./Recipe');

User.hasMany(Recipe, {
    foreignKey: 'user_id', //fixed user-id to user_id
    onDelete: 'CASCADE'
})

Recipe.belongsTo(User, {
    foreignKey: 'user_id' //Fixed foreign key spellings
});

module.exports = { User, Recipe }