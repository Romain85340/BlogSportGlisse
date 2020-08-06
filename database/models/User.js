const bcrypt = require("bcrypt")
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Le pseudo est obligatoire"]
    },

    email: {
        type: String,
        required: [true, "L email est obligatoire"],
        unique: [true, "L email est deja utilisé"],
    },

    image: String,

    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
    },
    
})

UserSchema.pre("save", function(next){
    const user = this
    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted
        next()
    })
})


module.exports = mongoose.model("User", UserSchema)