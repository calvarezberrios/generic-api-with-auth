const db = require("../data/dbConfig.js");

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    update,
    remove
};

function findAll() {
    return db("users");
}

function findBy(filter) {
    return db("users").where(filter).first();
}

function findById(id) {
    return db("users").where({id: id}).first();
}

function add(user) {
    return db("users").insert(user, "id").then(ids => findById(ids[0]));
}

function update(changes, id) {
    return db("users").where({ id: id }).update(changes).then(() => findById(id));
}

function remove(id) {
    return db("users").where({id: id}).delete();
}

