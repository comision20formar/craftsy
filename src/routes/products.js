const express = require('express');
const {detail, add, edit, create, update, remove} = require('../controllers/productsController');
const upload = require('../middlewares/upload');
const productAddValidator = require('../validations/productAddValidator');

const router = express.Router();

/* /products */

router
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/add', upload.single('image'), productAddValidator, create)
    .get('/edit/:id', edit)
    .put('/update/:id', upload.single('image'),update)
    .delete('/remove/:id',remove)


module.exports = router