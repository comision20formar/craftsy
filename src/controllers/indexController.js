const {readJSON} = require('../data');
const db = require('../database/models');

module.exports = {
    index : (req,res) => {

        const tutorials = readJSON('tutorials.json');
        const products = readJSON('products.json');

        return res.render('index',{
            tutorials,
            products
        })
    },
    admin : (req,res) => {

        const tutorials = db.Tutorial.findAll();
        const products = db.Product.findAll({
            include : ['brand','section','images']
        });
        const brands = db.Brand.findAll({
            order : ['name']
        })

        Promise.all([tutorials,products, brands])
            .then(([tutorials, products, brands]) => {
                return res.render('admin', {
                    products,
                    tutorials,
                    brands
                })
            })
            .catch(error => console.log(error))
      
    }
}