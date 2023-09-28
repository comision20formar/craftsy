const { validationResult } = require('express-validator');
const db = require('../../database/models');

module.exports = (req,res) => {
    
    const errors = validationResult(req);

    if(errors.isEmpty()){
        const {name, surname, birthday, gender, about, address, city, province} = req.body
       
        db.User.update(
            {
                name : name.trim(),
                surname: surname.trim(),
                birthday,
                gender,
                about : about.trim()
            },
            {
                where : {
                    id : req.session.userLogin.id
                }
            }
        )
            .then(response => {
                console.log(response);
                return res.redirect('/')
            })
            .catch(error => console.log(error))
       
    }else {
        db.User.findByPk(req.session.userLogin.id)
        .then(user => {
            return res.render('profile', {
                ...user.dataValues,
                errors : errors.mapped()
            })
        })
        .catch(error => console.log(error))
    }

    
}