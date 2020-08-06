const mongoose = require('mongoose');
const Post = require("../database/models/Article");
const path = require("path");


module.exports = (req, res) => {

    Post.updateOne(

        // Si tu trouve
        {_id: req.params.id},
        // Alors mettre a jour 
        {   
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        },
        // Option
        {multi: true},
        // Execution
        function(err){
            if(!err) {
                res.redirect("/")
            } else {
                res.send(err)
            }
        }
    )
}