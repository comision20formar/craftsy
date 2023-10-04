const db = require("../../database/models");

module.exports = (req,res) => {
    const tutorials = db.Tutorial.findAll();
    const products = db.Product.findAll({
        include : ['brand','section','images'],
        where : {
            brandId : req.query.brand
        }
    });
    const brands = db.Brand.findAll({
        order : ['name']
    })

    Promise.all([tutorials,products, brands])
        .then(([tutorials, products, brands]) => {
            return res.render('admin', {
                products,
                tutorials,
                brands,
                brand: req.query.brand
            })
        })
        .catch(error => console.log(error))
}