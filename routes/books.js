const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), booksController.getAllBooks);
router.get('/:id', requiresAuth(), booksController.getSingleBook);
router.post('/', requiresAuth(), validation.saveBook, booksController.createNewBook);
router.put('/:id', requiresAuth(), validation.saveBook, booksController.updateBook);
router.delete('/:id', requiresAuth(), booksController.deleteBook);

module.exports = router;