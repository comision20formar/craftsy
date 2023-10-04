const db = require('../../database/models')

module.exports = (req, res) => {
    
    const brands = db.Brand.findAll({
      order : ['name']
    });

    const sections = db.Section.findAll({
      order : ['name']
    });

    Promise.all([brands, sections])
      .then(([brands, sections]) => {
        return res.render("productAdd", {
          brands,
          sections
        });
      })
      .catch(error => console.log(error))

   
  }