const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), moviesController.getAllMovies);
router.get('/:id', requiresAuth(), moviesController.getSingleMovie);
router.post('/', requiresAuth(), validation.saveMovie, moviesController.createNewMovie);
router.put('/:id', requiresAuth(), validation.saveMovie, moviesController.updateMovie);
router.delete('/:id', requiresAuth(), moviesController.deleteMovie);

module.exports = router; 