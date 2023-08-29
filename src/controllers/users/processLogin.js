const {validationResult} = require('express-validator');
const { readJSON } = require('../../data');

module.exports = (req,res) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        const users = readJSON('users.json')
        const user = users.find(user => user.email === req.body.email);
        const {id, name, rol} = user;

        req.session.userLogin = {
            id,
            name,
            rol
        }

        console.log(req.session)

        return res.redirect('/')

    }else {
        return res.render('login',{
            errors : errors.mapped()
        })
    }
    
}