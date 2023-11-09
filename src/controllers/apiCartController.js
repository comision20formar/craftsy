module.exports = {
    showAll : async (req,res) => {
        try {

            if(!req.session.cart) {
                let error = new Error()
                error.message = 'Sesión no encontrada';
                error.status = 404;
                throw error
            }

            return res.status(200).json({
                ok : true,
                cart : req.session.cart
            })

        } catch (error) {
              return res.status(error.status || 500).json({
                ok : false,
                message : error.message || 'Upss, hubo un error'
            })
        }
     
    },
    addItem : async (req,res) => {

    },
    removeItem : async (req,res) => {

    },
    emptyCart : async (req,res) => {
        
    }
}