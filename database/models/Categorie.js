const mongoose = require("mongoose")


const CategorieSchema = new mongoose.Schema({
    title: String,
})

const Categorie = mongoose.model("categorie", CategorieSchema)

module.exports = Categorie