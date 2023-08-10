const express = require('express');
const {detail, add, edit, create, update} = require('../controllers/productsController');

const router = express.Router();

/* /products */

router
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/add',create)
    .get('/edit/:id', edit)
    .put('/update/:id',update)


module.exports = router