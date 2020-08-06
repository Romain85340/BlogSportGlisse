const User = require("../database/models/User")

module.exports = (req, res, next) => {

    // Connection a la base de donnée
    User.findById(req.session.userId, (err, user) => {
        
        if(err || !user) {
            return res.redirect("/user/connect")
        }
        next()

    })

}