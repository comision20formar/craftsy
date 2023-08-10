const express = require('express');
const router = express.Router();

const {index,admin} = require('../controllers/indexController')



/* / */
router.get('/', index);
router.get('/admin', admin)

module.exports = router;
