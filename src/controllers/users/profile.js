const db = require('../../database/models');

module.exports = (req,res) => {
    
    db.User.findByPk(req.session.userLogin.id)
        .then(user => {
            const birthday = user.birthday ? new Date(user.birthday).toISOString() : null;
            return res.render('profile', {
                ...user.dataValues,
                birthday : birthday ? birthday.split('T')[0] : null
            })
        })
        .catch(error => console.log(error))


   
}