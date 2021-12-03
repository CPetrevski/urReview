const router = require('express').Router();
const { User, Movie, Review } = require('../../models');

//create a new review
router.post('/', async (req, res) => {
  try {
    const reviewData = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit a review
router.put('/:id', async (req, res) => {
  try {
    const reviewData = await Review.update(
      {
        review: req.body.review
      },
      {
        where: {
          id: req.params.id,
          user_id:req.session.user_id,
        }
      });

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit a review
router.put('/:id/like/', async (req, res) => {
  try {
    const reviewData = await Review.update(
      {
        likes: req.body.likes
      },
      {
        where: {
          id: req.params.id,
        }
      });

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one review by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
