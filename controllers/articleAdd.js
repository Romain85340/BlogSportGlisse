const Article = require("../database/models/Article")
const Categorie = require("../database/models/Categorie")

module.exports = async (req, res) => {

    if(req.session.userId) {
        const categorie = await Categorie.find({})
        return res.render("addArticle", { categorie })
    }
    res.redirect("/user/connect")
}