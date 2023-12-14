const express = require('express');
const { checkEmail, getAllProduct, getAllSections, getAllBrands, createProduct, updateProduct, deleteProduct } = require('../controllers/apiController');
const upload = require('../middlewares/upload');
const router = express.Router();

/* /apis */
router
    .get('/check-email', checkEmail)
    .get('/products',getAllProduct)
    .post('/products', upload.any(), createProduct)
    .put('/products/:id',upload.any(), updateProduct)
    .delete('/products/:id',deleteProduct)
    .get('/sections',getAllSections)
    .get('/brands', getAllBrands)


module.exports = router;
