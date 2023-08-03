const products = require('../data/products.json');


module.exports = {
    detail : (req,res) => {

        const id = req.params.id;
        const product = products.find(product => product.id === +id);

        return res.render('detail', {
            product
        })
    }
}