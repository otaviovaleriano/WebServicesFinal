const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', validation.saveMovie, moviesController.createNewMovie);
router.put('/:id', validation.saveMovie, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;