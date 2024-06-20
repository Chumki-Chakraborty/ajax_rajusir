const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyparser = require('body-parser')
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
// This allows us to pass data from the form
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Cookie Parser, sessions and flash
app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
//view engine
app.set('view engine', 'ejs')
app.set('views', 'views')


//api routes
const apiroute = require('./routes/apiRoutes')
app.use('/api', apiroute)

//ui routes
const uiroute = require('./routes/uiRoutes')
app.use('/', uiroute)

const userRoute=require('./routes/userRoute')
app.use(userRoute)

//define port
const port = 9090

//mongodb connection
const db = "mongodb+srv://mailsouravdhar:uZFXOrCetjzCvh07@cluster0.oxclckb.mongodb.net/assignmentAPI"
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(port, () => {
            console.log(`App is running on port -> http://localhost:${port}`);
        })        
    }).catch((error) => {
        console.log(error);
    })