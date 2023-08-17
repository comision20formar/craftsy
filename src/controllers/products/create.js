const { readJSON, writeJSON } = require("../../data");
const Product = require("../../data/Product");

module.exports = (req, res) => {
    const products = readJSON("products.json");

    const data = {
      ...req.body,
      image : req.file ? req.file.filename : null
    }

    let newProduct = new Product(data);
    products.push(newProduct);

    writeJSON(products, 'products.json');

    return res.redirect('/admin');
  }