const { readJSON, writeJSON } = require("../../data")

module.exports = (req,res) => {
    const products = readJSON('products.json');
    const id = req.params.id;

    const productsModify = products.filter(product => product.id !== id);

    writeJSON(productsModify, 'products.json')

    return res.redirect('/admin')
}