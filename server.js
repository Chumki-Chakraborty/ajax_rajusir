const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const session = require('express-session');
const flash = require('connect-flash');
const rateLimitMiddleware=require('./middleware/reatLimit')
const bodyParser=require('body-parser')
const app = express()

//for express rate limit
//app.use(rateLimitMiddleware)

app.use(session({
    secret:'secrect',
    cookie:{maxAge:600000},
    resave:false,
    saveUninitialized:false
}))

app.use(flash())


app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
})); // get information from html forms
app.use(bodyParser.json({
    limit: "50mb"
}));

app.use(express.static(path.join(__dirname, "public")))

//Step 2
app.use('/upload', express.static(path.join(__dirname, "upload")))

//Step 3

app.set("view engine", "ejs")
app.set("views", "views")

// Access Route
const studentRouter = require('./route/studentRouter');
//const apiRouter = require('./route/apiRouter');
app.use(studentRouter);
//app.use("/api/", apiRouter);

const AjaxRoute=require('./route/ajaxroute')
app.use(AjaxRoute)

const unwindRoute=require('./route/unwindRoute')
app.use(unwindRoute)

const dbDriver = "mongodb+srv://abhishek:rKbKhmexljtap0Rh@cluster0.jwma6.mongodb.net/dbStudentdata"

const port = process.env.PORT || 5000

mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    app.listen(port, () => {
        console.log(`DB Is Connected @ http://localhost:${port}`);
        console.log(`Server Is Connected!!!`);
    })
}).catch((error) => {
    console.log(`Something Went Wrong!!!`);
})