const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const categoriesController = require('../controllers/categories');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), categoriesController.getAllCategories);
router.get('/:id', requiresAuth(), categoriesController.getSingleCategorie);
router.post('/', requiresAuth(), validation.saveCategorie, categoriesController.createNewCategorie);
router.put('/:id', requiresAuth(), validation.saveCategorie, categoriesController.updateCategorie);
router.delete('/:id', requiresAuth(), categoriesController.deleteCategorie);

module.exports = router;