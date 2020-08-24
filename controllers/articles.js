const Article = require("../database/models/Article")

module.exports = async (req, res) => {

    const articles = await Article.aggregate(
      [{$group : 
        {
          categories : { $push : { title: "$title" }},
          _id : "$categorie",
          articles : { $push : { title: "$title", content: "$content", author:"$author", image: "$image", id: "$_id" }}}
        }
      ]
    )

  res.json(articles)
}
