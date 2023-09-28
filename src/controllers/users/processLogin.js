const {validationResult} = require('express-validator');
const db = require('../../database/models');
module.exports = (req,res) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        const {email, remember} = req.body

        db.User.findOne({
            where : {
                email
            }
        })
            .then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.roleId
                }
        
                remember !== undefined && res.cookie('craftsyForEver20',req.session.userLogin,{
                    maxAge : 1000 * 60
                })
        
                return res.redirect('/')
            })
            .catch(error => console.log(error))
      
    }else {
        return res.render('login',{
            errors : errors.mapped()
        })
    }
    
}