const express = require('express');
const { checkEmail, getAllProduct, getAllSections, getAllBrands, createProduct, updateProduct, deleteProduct } = require('../controllers/apiController');
const router = express.Router();

/* /apis */
router
    .get('/check-email', checkEmail)
    .get('/products',getAllProduct)
    .post('/products',createProduct)
    .put('/products/:id',updateProduct)
    .delete('/products/:id',deleteProduct)
    .get('/sections',getAllSections)
    .get('/brands', getAllBrands)


module.exports = router;
