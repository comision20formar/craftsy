const express = require('express');
const { checkEmail, getAllProduct, getAllSections, getAllBrands, createProduct } = require('../controllers/apiController');
const router = express.Router();

/* /apis */
router
    .get('/check-email', checkEmail)
    .get('/products',getAllProduct)
    .post('/products',createProduct)
    .get('/sections',getAllSections)
    .get('/brands', getAllBrands)


module.exports = router;
