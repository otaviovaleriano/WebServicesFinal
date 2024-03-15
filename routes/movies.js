const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getSingleMovies);
router.post('/', validation.saveMovies, moviesController.createNewMovies);
router.put('/:id', validation.saveMovies, moviesController.updateMovies);
router.delete('/:id', moviesController.deleteMovies);

module.exports = router;