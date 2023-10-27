const express = require('express');
const router = express.Router();

const {index,admin} = require('../controllers/indexController');
const checkAdmin = require('../middlewares/checkAdmin');



/* / */
router.get('/', index);
router.get('/admin',checkAdmin, admin)

module.exports = router;
