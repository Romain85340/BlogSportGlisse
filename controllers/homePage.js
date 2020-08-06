const Post = require("../database/models/Article")
const Categorie = require("../database/models/Categorie")
const User = require("../database/models/User")



module.exports = async (req, res) => {

const post = await Post.aggregate(
      [ {$group : 
        {
          _id : "$categorie",
          articles : {$push : { title: "$title", content: "$content", author:"$author", image: "$image" }}}
          
        }
      ],
    )
  res.render("index", { post })
}