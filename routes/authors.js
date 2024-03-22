const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), authorsController.getAllAuthors);
router.get('/:id', requiresAuth(), authorsController.getSingleAuthor);
router.post('/', requiresAuth(), validation.saveAuthor, authorsController.createNewAuthor);
router.put('/:id', requiresAuth(), validation.saveAuthor, authorsController.updateAuthor);
router.delete('/:id', requiresAuth(), authorsController.deleteAuthor);

module.exports = router;