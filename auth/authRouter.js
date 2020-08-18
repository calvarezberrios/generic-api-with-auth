const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");
const validate = require("../api/validate.js");


router.post("/register", validate.user, (req, res, next) => {
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

router.post("/login", (req, res, next) => {
    const {username, password} = req.body;

    Users.findBy({ username })
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ user_id: user.id, username: user.username, token });
            } else {
                next({ code: 404, message: "Username and/or Password incorrect"})
            }
        })
        .catch(err => next({ code: 500, message: "Error retrieving user data", err }));
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