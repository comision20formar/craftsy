const db = require('../../database/models');

module.exports = (req,res) => {
    
    db.User.findByPk(req.session.userLogin.id)
        .then(user => {
            const birthday = new Date(user.birthday).toISOString();
            console.log(birthday)
            return res.render('profile', {
                ...user.dataValues,
                birthday : birthday.split('T')[0]
            })
        })
        .catch(error => console.log(error))


   
}