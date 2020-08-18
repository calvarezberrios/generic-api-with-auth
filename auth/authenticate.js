const secrets = require("../config/secrets.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        next({ code: 401, message: "Missing Authorization header" });
    } else {

        const [authType, token] = req.headers.authorization.split(" ");

        if(authType && authType.toLowerCase() === "bearer" && token) {
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if(!err) {
                    req.jwt = decodedToken;
                    next();
                } else {
                    next({ code: 403, message: "Invalid Token, please login again" });
                }
            });
        } else {
            next({ code: 401, message: "Not Authorized" });
        }
    }
}