const {v4 : uuidv4} = require('uuid');
const {hashSync} = require('bcryptjs');

const User = function ({name, surname, email, password}) {
    this.id = uuidv4();
    this.name = name.trim();
    this.surname = surname.trim();
    this.email = email.trim();
    this.password = hashSync(password.trim(),10);
    this.rol = "user";
    this.birthday = null;
}

module.exports = User