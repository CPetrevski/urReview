const router = require('express').Router();
const { User, Movie, Review } = require('../../models');

// router.get('/', async (req, res) => {
//     try {
//         const reviewData = await Review.findAll();

//         if (!reviewData) {
//             res.status(404).json({ message: 'No reviews found!' });
//             return;
//         }

//         res.status(200).json(reviewData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            include: [{
                model: Movie
            }]
        });

        if (!reviewData) {
            res.status(404).json({ message: 'No review found with this ID!' });
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const reviewData = await Review.create(req.body);

        if (!reviewData) {
            res.status(404).json({ message: 'Cannot create review' });
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//to update the review
router.put('/:id', async (req, res) => {
    try {
      const reviewData = await Review.update(
        {
          review: req.body.review
        },
        {
          where: {
            id: req.params.id
          }
        });
  
      if (!reviewData) {
        res.status(404).json({ message: 'Cannot update category with this id!' });
        return;
      }
  
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
          id: req.params.id
        }
      });
  
      if (!reviewData) {
        res.status(404).json({ message: 'No review to be deleted with this id!' });
        return;
      }
  
      res.status(200).json(reviewData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
