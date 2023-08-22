const {check, body} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
    check('brand')
        .notEmpty().withMessage('La marca es requerida'),
    check('price')
        .notEmpty().withMessage('Debes indicar el precio').bail()
        .isDecimal().withMessage('El precio debe ser un número'),
    check('description')
        .notEmpty().withMessage('La descripción es requerida').bail()
        .isLength({
            min : 20,
            max : 500
        }).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
    body('image')
        .custom((value, {req}) => {
           if(req.file){
                return true
           }
           return false
        }).withMessage('No has subido ninguna imagen')
]