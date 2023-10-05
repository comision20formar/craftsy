const express = require('express');
const {detail, add, edit, create, update, remove, filter} = require('../controllers/productsController');
const upload = require('../middlewares/upload');
const productAddValidator = require('../validations/productAddValidator');

const router = express.Router();

/* /products */

router
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/add', upload.fields([
      {
        name: "image",
      },
      {
        name: "images",
      },
    ]), productAddValidator, create)
    .get('/edit/:id', edit)
    .put('/update/:id', upload.fields([
      {
        name: "image",
      },
      {
        name: "images",
      },
    ]),update)
    .delete('/remove/:id',remove)
    .get('/filter',filter)


module.exports = router