const router = require('express').Router();
const { User, Movie, Review } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const movieData = await Movie.findByPk(req.params.id, {
            include: [{ model: Review }]
        });

        if (!movieData) {
            res.status(404).json({ message: 'No category found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
