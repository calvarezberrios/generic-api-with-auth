const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");
const validate = require("../api/validate.js");


router.post("/register", validate.register, (req, res, next) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(newUser => {
            const token = generateToken(newUser);
            res.status(201).json({user_id: newUser.id, username: newUser.username, token});
        })
        .catch(err => next({ code: 500, message: "Error creating user", err }));

});

router.post("/login", validate.login, (req, res, next) => {
    const user = req.user;

    const token = generateToken(user);
    res.status(200).json({ user_id: user.id, username: user.username, token });

});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        created_at: Date.now()
    };

    const options = {
        expiresIn: "3h",
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;