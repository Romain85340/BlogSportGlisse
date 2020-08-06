const mongoose = require('mongoose');
const Article = require("../database/models/Article")



module.exports = (req, res) => {

    Article.findOne({_id: req.params.id}, function(err, article){
        if(!err){
            res.render("editArticle", {
                _id: article.id,
                title: article.title,
                content: article.content,
                author: article.author,
            })
        } else {
            res.redirect("/")
        }
    })
}