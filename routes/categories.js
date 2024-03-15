const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const categoriesController = require('../controllers/categories');
const validation = require('../middleware/validate');

// router.get('/', categoriesController.getAllCategories);
// router.get('/:id', categoriesController.getSingleCategories);
// router.post('/', validation.saveCategories, categoriesController.createNewCategories);
// router.put('/:id', validation.saveCategories, categoriesController.updateCategories);
// router.delete('/:id', categoriesController.deleteCategories);

module.exports = router;