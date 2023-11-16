const { Op } = require("sequelize");
const db = require("../../database/models");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = (req, res) => {
    
   db.Product.findByPk(req.params.id, {
    include : ['images']
   })
    .then(product => {

      db.Product.findAll({
        where : {
          [Op.or] : {
            brandId : product.brandId,
            sectionId : product.sectionId
          }
        }
      }).then(products => {
        return res.render("productDetail", {
          product,
          products,
          toThousand
        });
      })
     
    })
    .catch(error => console.log(error))

  
  }