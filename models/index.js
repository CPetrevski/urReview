const User = require('./User');
const Review = require('./Review');
const Movie = require('./Movie');

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

Movie.belongsTo(Review, {
  foreignKey: 'movie_id'
});


module.exports = { User, Movie, Review };
