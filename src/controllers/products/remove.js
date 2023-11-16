const {existsSync, unlinkSync} = require('fs')
const db = require('../../database/models')


module.exports = (req,res) => {

    const id = req.params.id;

    db.Product.findByPk(id)
        .then(product => {
            
            existsSync(`./public/images/${product.image}`) &&
            unlinkSync(`./public/images/${product.image}`);
            
            product.destroy();

            return res.redirect('/admin')

        })
        .catch(error => console.log(error))


}