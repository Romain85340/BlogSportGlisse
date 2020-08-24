const Post = require("../database/models/Article")
const Categorie = require("../database/models/Categorie")
const User = require("../database/models/User")
const categorieAdd = require("./categorieAdd")



module.exports = async (req, res) => {

const post = await Post.aggregate(
      [ {$group : 
        {
          _id : "$categorie",
          articles : {$push : { title: "$title", content: "$content", author:"$author", image: "$image", id: "$_id" }}}
          
        }
      ],
    )

  res.render("index", { post })
}