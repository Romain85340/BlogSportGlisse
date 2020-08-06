const Categorie = require("../database/models/Categorie")

module.exports = async (req, res) => {

    const categorie = await Categorie.find({})
    res.render("categorie", { categorie })
}