const {existsSync, unlinkSync} = require('fs');
const {validationResult} = require('express-validator');
const { readJSON, writeJSON } = require("../../data");
const Product = require("../../data/Product");

module.exports = (req, res) => {
    
    const errors = validationResult(req);

    if(errors.isEmpty()){

      const products = readJSON("products.json");
      const data = {
        ...req.body,
        image : req.file ? req.file.filename : null
      }
  
      let newProduct = new Product(data);
      products.push(newProduct);
  
      writeJSON(products, 'products.json');
  
      return res.redirect('/admin');

    }else {

      if(req.file){
        existsSync('./public/images/' + req.file.filename) && unlinkSync('./public/images/' + req.file.filename)
      }

      const brands = readJSON("brands.json");

      return res.render("productAdd", {
        brands: brands.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        ),
        errors : errors.mapped(),
        old : req.body
      });
    }


  
  }