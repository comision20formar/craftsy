const products = require('../data/products.json');


module.exports = {
    detail : (req,res) => {

        const id = req.params.id;
        const product = products.find(product => product.id === +id);

        return res.render('productDetail', {
            product
        })
    },
    add : (req, res) => {
        return res.render('productAdd')
    },
    edit : (req,res) => {
        return res.render('productEdit')
    }
}