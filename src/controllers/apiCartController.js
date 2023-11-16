const db = require('../database/models');

module.exports = {

    showAll : async (req,res) => {
        try {

            if(!req.session.cart) {
                let error = new Error()
                error.message = 'Debes loguearte';
                error.status = 404;
                throw error
            }

            return res.status(200).json({
                ok : true,
                cart : req.session.cart,
                message : "ok"
            })

        } catch (error) {
              return res.status(error.status || 500).json({
                ok : false,
                cart : null,
                message : error.message || 'Upss, hubo un error'
            })
        }
     
    },
    addItem : async (req,res) => {
        try {

            if(!req.session.cart) {
                let error = new Error()
                error.message = 'Debes loguearte';
                error.status = 404;
                throw error
            }

            const {quantity, product: id} = req.body;

            const {name, image, price, discount} = await db.Product.findByPk(id);

            if(req.session.cart.products.map(product => product.id).includes(id)){

                req.session.cart.products = req.session.cart.products.map(product => {
                    if(product.id === +id){
                        ++product.quantity
                    }
                    return product
                });

            }else{

                req.session.cart.products.push({
                    id,
                    name,
                    image,
                    price,
                    discount,
                    quantity,
                });
            }         

            req.session.cart.total = req.session.cart.products.map(product => product.price * product.quantity).reduce((a,b) => a + b, 0)

            return res.status(200).json({
                ok : true,
                cart : req.session.cart,
                message : "Producto agregado exitosamente"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                cart : null,
                message : error.message || 'Upss, hubo un error'
            })
        }
    },
    removeItem : async (req,res) => {

        try {

            if(!req.session.cart) {
                let error = new Error()
                error.message = 'Debes loguearte';
                error.status = 404;
                throw error
            }

            const {product : id} = req.query;

            req.session.cart.products = req.session.cart.products.map(product => {
                if(product.id === +id && product.quantity > 1){
                    --product.quantity
                }
                return product
            });

            req.session.cart.total = req.session.cart.products.map(product => product.price * product.quantity).reduce((a,b) => a + b, 0)

            return res.status(200).json({
                ok : true,
                cart : req.session.cart,
                message : "Producto eliminado exitosamente"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                cart : null,
                message : error.message || 'Upss, hubo un error'
            })
        }

    },
    removeAllItem : async (req,res) => {
        try {
            if(!req.session.cart) {
                let error = new Error()
                error.message = 'Debes loguearte';
                error.status = 404;
                throw error
            }

            const {product : id} = req.query;

            req.session.cart.products = req.session.cart.products.filter(product => product.id !== +id );

            req.session.cart.total = req.session.cart.products.map(product => product.price * product.quantity).reduce((a,b) => a + b, 0)

            return res.status(200).json({
                ok : true,
                cart : req.session.cart,
                message : "Producto eliminado exitosamente"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                cart : null,
                message : error.message || 'Upss, hubo un error'
            })
        }
    },

    emptyCart : async (req,res) => {
        try {

            if(!req.session.cart) {
                let error = new Error()
                error.message = 'Debes loguearte';
                error.status = 404;
                throw error
            }

              req.session.cart = {
                ...req.session.cart,
                products : [],
                total : 0,
            }

            return res.status(200).json({
                ok : true,
                cart : req.session.cart,
                message : "Carrito vaciado"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                cart : null,
                message : error.message || 'Upss, hubo un error'
            })
        }
    }
}