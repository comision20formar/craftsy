const express = require('express');
const { showAll, addItem, removeItem, emptyCart, removeAllItem } = require('../controllers/apiCartController');
const router = express.Router();

/* /cart */
router
    .get('/', showAll)
    .post('/', addItem)
    .delete('/', removeItem)
    .delete('/item-all',removeAllItem)
    .delete('/all',emptyCart)

module.exports = router;
