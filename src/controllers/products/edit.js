const db = require("../../database/models");

module.exports =  (req, res) => {

    const product = db.Product.findByPk(req.params.id,{
      include : ['images']
    });
    const brands = db.Brand.findAll({
      order : ['name']
    })
    const sections = db.Section.findAll({
      order : ['name']
    });

    Promise.all([product, brands, sections])
      .then(([product, brands, sections]) => {
        return res.render("productEdit", {
          ...product.dataValues,
          brands,
          sections
      });
      })
      .catch(error => console.log(error))

    

   
  }