const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        return callback(null,'./public/images')
    },
    filename : (req,file,callback) => {
        return callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage
});

module.exports = upload