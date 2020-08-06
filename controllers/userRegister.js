const User = require("../database/models/User")
const path = require("path")

module.exports = (req, res) => {

    const { image } = req.files
    const uploadFile = path.resolve(__dirname, "..", "public/image", image.name);

    image.mv(uploadFile, (err) => {
        User.create(
            {
                ...req.body,
                image: `/image/${image.name}`
            }
            , (err, user) => {
                if(err) {

                    const registerError = Object.keys(err.errors).map(key => err.errors[key].message);

                    req.flash("registerError", registerError)
                    req.flash("data", req.body)

                    return res.redirect("/user/create")
                }
                res.redirect("/")
        })
    })
}
