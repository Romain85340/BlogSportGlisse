const Categorie = require("../database/models/Categorie")

module.exports = async (req, res) => {

    const categories = await Categorie.find({})
    res.json(categories)
}