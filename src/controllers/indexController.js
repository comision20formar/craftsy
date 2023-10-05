const {readJSON} = require('../data');
const db = require('../database/models');

module.exports = {
    index : (req,res) => {

        const tutorials = db.Tutorial.findAll();
        const sections = db.Section.findAll({
            include : [
                {
                    association : 'products',
                    include : [
                        {
                            all : true
                        }
                    ]
                }
            ]
        })
        Promise.all([tutorials, sections])
            .then(([tutorials, sections]) => {
                //return res.send(sections)
                return res.render('index',{
                    tutorials,
                    sections
                })
            })
            .catch(error => console.log(error))
       
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