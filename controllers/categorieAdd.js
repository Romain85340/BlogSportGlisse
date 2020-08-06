const Categorie = require("../database/models/Categorie")


module.exports = (req, res) => {
    
    Categorie.create(
        {
            title: req.body.title
        }
        , (err) => {
            if(!err){
                res.redirect("/categorie")
            }
    })
}