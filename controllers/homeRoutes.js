const router = require('express').Router();
const { User, Movie, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const movieData = await Movie.findAll(
      { include: [{ model: Review }] }
    );
    // console.log (movieData)
    // console.log(JSON.stringify({ movieData }, null, 2)); //for testing
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    // console.log (movies) 
    res.render('homepage', {
      movies,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// See a movie and it's reviews and comments at the /movie/id page
router.get('/movie/:id', async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id, {
      include: [
        {
          model: Review
        },
        // Will need to include Comment model when we set up Comment later
        // {
        //   model: Comment,
        //   include: [{
        //     model: User,
        //     attributes: ['name'],
        //   }]
        // },
      ],
    });

    const movie = movieData.get({ plain: true });
    console.log(JSON.stringify({ movieData }, null, 2));

    res.render('movie', {
      ...movie,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/review/:id/edit', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User
        },
      ],
    });
    console.log(JSON.stringify({ reviewData }, null, 2));
    const review = reviewData.get({ plain: true });

    res.render('editReview', {
      ...review,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    //to get review data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },

      include: [{ model: Review }],

      include: [{ model: Review, Movie}]

    });

    console.log(JSON.stringify({ userData }, null, 2));
    const user = userData.get({ plain: true });

    //to get movie data
    const reviewData = await Review.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{
        model: Movie
      }],
    });

    reviewData.forEach((item) => {
      const review = item.get({ plain: true });
      //TODO
      // merge movie_title from review into the user object
    }
    );

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    console.log('already logged in');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    console.log('already logged in');
    return;
  }

  res.render('signup');
});

module.exports = router;