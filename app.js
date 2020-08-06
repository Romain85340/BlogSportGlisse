// Dependance

const express = require("express")
const exphbs  = require('express-handlebars')
const ejs  = require('ejs')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const Handlebars = require("handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const methodOverride = require("method-override");
const fileupload = require("express-fileupload")
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')
const connectFlash = require('connect-flash');



// Express
const app = express();

// Connect Local Database with mongoose
mongoose.connect('mongodb://localhost:27017/BlogSport', { useNewUrlParser: true, useUnifiedTopology: true });

// Mongo connect
const mongoStore = MongoStore(expressSession)

// Connect-Flash
app.use(connectFlash())

// Express Session
app.use(expressSession({
    secret: "securité",
    name: "cookie",
    saveUninitialized: true,
    resave: false,
    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))

// Express static
app.use(express.static("public"));

// Method-override
app.use(methodOverride("_method"));

// handlebars
app.engine('hbs', exphbs({ defaultLayout: "main", extname: "hbs", handlebars: allowInsecurePrototypeAccess(Handlebars),}));
app.set('view engine', 'hbs');

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Express file upload
app.use(fileupload())


//////////////////////
// Middleware
//////////////////////

const validAddArticle = require("./middleware/validAddArticle", )
const auth = require("./middleware/auth")
const redirectAuthSucess = require("./middleware/redirectAuthSucess")

app.use("/article/post", validAddArticle)
app.use("/article/add", auth)
app.use("*", (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})

///////////////////
// Controllers
////////////////////


// Index
const homePage = require("./controllers/homePage")

// Article
const articleAdd = require("./controllers/articleAdd")
const articlePost = require("./controllers/articlePost")
const articleEditGet = require("./controllers/articleEditGet")
const articleEditPut = require("./controllers/articleEditPut")
const articles =  require("./controllers/articles")

// Categorie
const categorieGet = require("./controllers/categorieGet")
const categorieAdd = require("./controllers/categorieAdd")
const categoriesGet = require("./controllers/categories")


// User
const userCreate = require("./controllers/userCreate")
const userRegister = require("./controllers/userRegister")
const userConnect = require("./controllers/userConnect")
const userConnectAuth = require("./controllers/userConnectAuth")
const userDisconnect = require("./controllers/userDisconnect")

///////////////////////
// Route
///////////////////////


// Route index
app.get("/", homePage)

// Route Article
app.get("/article/add", auth, articleAdd)
app.post("/article/post", auth, articlePost)
app.get("/article/edit/:id", articleEditGet)
app.put("/article/edit/:id", articleEditPut)
app.get("/articles", articles)

// Route Categorie
app.get("/categorie", categorieGet)
app.post("/categorie/post", categorieAdd)
app.get("/categories", categoriesGet)

// Route user
app.get("/user/create", userCreate)
app.post("/user/register", userRegister)
app.get("/user/connect", userConnect)
app.post("/user/connectAuth", userConnectAuth)
app.get("/user/disconnect", userDisconnect)



//////////////////
// Start Localhost
//////////////////
app.listen("2050", function(){
    console.log("Le serveur tourne sur le port 2020");
})