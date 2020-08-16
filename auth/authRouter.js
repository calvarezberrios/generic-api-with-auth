const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

router.post("/register", (req, res, next) => {
    res.status(200).send("Register User Endpoint")
});

router.post("/login", (req, res, next) => {
    res.status(200).send("Login User Endpoint")
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

    jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;