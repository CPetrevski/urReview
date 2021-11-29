const router = require('express').Router();
const { User, Movie, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const movieData = await Movie.findAll(
      {
        include: [
          {
            model: Review
          },
        ],
      }
    );
    // console.log(JSON.stringify({ movieData }, null, 2)); //for testing
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    res.render('homepage', {
      articles: movies,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
    res.render('login');
  });
 
  module.exports = router;