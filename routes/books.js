const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
router.post('/', validation.saveBook, booksController.createNewBook);
router.put('/:id', validation.saveBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;