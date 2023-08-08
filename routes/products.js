const express = require('express');
const {detail, add, edit} = require('../controllers/productsController');

const router = express.Router();

/* /products */

router.get('/detail/:id', detail)
router.get('/add', add)
router.get('/edit', edit)


module.exports = router