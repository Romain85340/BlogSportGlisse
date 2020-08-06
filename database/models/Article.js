const mongoose = require("mongoose");
// const Categorie = require("../database/models/Categorie")
// const fileUpload = require("express-fileupload");

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: "categorie" }],
    image: String,
    createDate : {
        type: Date,
        default : new Date()
    }
})

const Article = mongoose.model("article", ArticleSchema)

module.exports = Article