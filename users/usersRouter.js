const router = require("express").Router();
const Users = require("./users-model.js");
const validate = require("../api/validate.js");

router.put("/:id", validate.user)

router.get("/", (req, res, next) => {
    Users.findAll()
        .then(users => res.status(200).json(users))
        .catch(err => next({ code: 500, message: "Error retrieving users", err }));
});

router.get("/:id", (req, res, next) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => next({ code: 500, message: "Error retreiving user data", err }));
});

router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findById(id)
        .then(user => {
            if(user) {
                Users.update(changes, id)
                    .then(updated => {
                        res.status(200).json(updated);
                    })
                    .catch(err => next({ code: 500, message: "Error updating user data", err }));
            } else {
                next({ code: 404, message: "User Not Found" });
            }
        })
        .catch(err => next({ code: 500, message: "Error retrieving user data", err }));
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    Users.findById(id) 
        .then(user => {
            if(user) {
                Users.remove(id)
                    .then(() => res.status(204).end())
                    .catch(err => next({ code: 500, message: "Error removing user data", err }));
            } else {
                next({ code: 404, message: "User not found" });
            }
        })
        .catch(err => next({ code: 500, message: "Error retrieving user data" }));
        
});

module.exports = router;