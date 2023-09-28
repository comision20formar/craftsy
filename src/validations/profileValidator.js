const { check} = require("express-validator");
const db = require('../database/models');

module.exports = [
  check("name")
    .isLength({
      min: 2,
    })
    .withMessage("Debe tener como mínimo dos letras")
    .bail()
    .isAlpha('es-ES',{ignore: ' '})
    .withMessage("Solo se permiten caracteres alfabéticos"),
  check("surname")
    .isLength({
      min: 2,
    })
    .withMessage("Debe tener como mínimo dos letras")
    .bail()
    .isAlpha('es-ES',{ignore: ' '})
    .withMessage("Solo se permiten caracteres alfabéticos"),
];
