const express = require('express');
const {detail, add, edit, create, update, remove} = require('../controllers/productsController');

const router = express.Router();

/* /products */

router
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/add',create)
    .get('/edit/:id', edit)
    .put('/update/:id',update)
    .delete('/remove/:id',remove)


module.exports = router