const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');

router.get('/', authorsController.getAllAuthors);
// router.get('/:id', authorsController.getSingleAuthor);
// router.post('/', validation.saveAuthor, authorsController.createNewAuthor);
// router.put('/:id', validation.saveAuthor, authorsController.updateAuthor);
// router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;