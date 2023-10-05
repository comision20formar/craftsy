const db = require("../../database/models");

module.exports = (req, res) => {
    
   db.Product.findByPk(req.params.id, {
    include : ['images']
   })
    .then(product => {
      return res.render("productDetail", {
        product,
      });
    })
    .catch(error => console.log(error))

  
  }