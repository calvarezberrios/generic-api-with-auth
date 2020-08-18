module.exports = {
    user: (req, res, next) => {
        const user = req.body;

        if(!(user.fname && user.lname && user.email && user.username && user.password)) {
            next({ code: 400, message: "Missing required data: First Name, Last Name, Email, Username, Password" });
        } else {
            next();
        }
    },
}