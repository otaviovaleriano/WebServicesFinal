const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const categoriesController = require('../controllers/categories');
const validation = require('../middleware/validate');

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getSingleCategorie);
router.post('/', validation.saveCategorie, categoriesController.createNewCategorie);
router.put('/:id', validation.saveCategorie, categoriesController.updateCategorie);
router.delete('/:id', categoriesController.deleteCategorie);

module.exports = router;