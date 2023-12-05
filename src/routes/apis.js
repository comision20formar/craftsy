const express = require('express');
const { checkEmail, getAllProduct } = require('../controllers/apiController');
const router = express.Router();

/* /apis */
router
    .get('/check-email', checkEmail)
    .get('/products',getAllProduct)


module.exports = router;
