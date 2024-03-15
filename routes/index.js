const express = require('express');
const router = express.Router();

// const myController = require('../controllers');
// routes.get('/more', myController.returnAnotherPerson);

router.use('/', require('./swagger'));
router.use('/books', require('./books'));
// router.use('/movies', require('./movies'));
router.use('/authors', require('./authors'));
// router.use('/categories', require('./categories'));



module.exports = router;