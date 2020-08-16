const router = require("express").Router();
const Users = require("./users-model.js");

router.get("/", (req, res, next) => {
    Users.findAll()
        .then(users => res.status(200).json(users))
        .catch(err => next({ code: 500, message: "Error retrieving users", err }));
});

module.exports = router;