const router = require('express').Router();
const { User, Movie, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const movieData = await Movie.findAll(
      { include: [{ model: Review }] }
    );
    // console.log(JSON.stringify({ movieData }, null, 2)); //for testing
    const movies = movieData.map((movie) => movie.get({ plain: true }));

    res.render('homepage', {
      movies,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// See a movie and it's reviews and comments at the /movie/id page
router.get('/movie/:id', async (req, res) => {
  try {
    const movieData = await Article.findByPk(req.params.id, {
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
    //console.log(JSON.stringify({ article }, null, 2)); 

    res.render('movie', {
      ...movie,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/article/:id/edit', async (req, res) => {
//   try {
//     const articleData = await Article.findByPk(req.params.id, {
//       include: [
//         {
//           model: User
//         },
//       ],
//     });
//     const article = articleData.get({ plain: true });
//     //console.log(JSON.stringify({ article }, null, 2));
//     res.render('editArticle', {
//       ...article,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;