const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");

module.exports = {
    user: (req, res, next) => {
        const { id } = req.params;

        Users.findById(id)
            .then(user => {
                if(user) {
                    req.user = user;
                    next();
                } else {
                    next({ code: 404, message: "User not found!" });
                }
            })
            .catch(err => next({ code: 500, message: "Error retrieving user data.", err }));
    },
    register: (req, res, next) => {
        const user = req.body;

        if(!(user.fname && user.lname && user.email && user.username && user.password)) {
            next({ code: 400, message: "Missing required data: First Name, Last Name, Email, Username, Password" });
        } else {
            next();
        }
    },
    login: (req, res, next) => {
        const {username, password } = req.body;

        if(!(username && password)) {
            next({ code: 400, message: "Missing required data: Username, Password" });
        } else {
            Users.findBy({ username })
                .then(user => {
                    if(user && bcrypt.compareSync(password, user.password)){
                        req.user = user;
                        next();
                    } else {
                        next({ code: 401, message: "Username and/or Password incorrect!" });
                    }
                })
                .catch(err => next({ code: 500, message: "Error retrieving user data", err }));
        }
    },
}