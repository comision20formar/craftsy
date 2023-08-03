const tutorials = require('../data/tutorials.json');
const products = require('../data/products.json');

module.exports = {
    index : (req,res) => {
        return res.render('index',{
            tutorials,
            products
        })
    }
}