const { readJSON, writeJSON } = require("../../data")

module.exports = (req,res) => {
    const users = readJSON('users.json');
    const {name, surname, birthday, gender, about} = req.body
    const usersUpdated = users.map(user => {
        if(user.id === req.session.userLogin.id){
            return {
                ...user,
                name : name.trim(),
                surname: surname.trim(),
                birthday,
                gender,
                about : about.trim()
            }
        }
        return user
    })

    writeJSON(usersUpdated, 'users.json');
    return res.redirect('/')
}