const express = require('express');
const passport = require('passport');
const app = express();
const MongoStore = require('connect-mongo')
const session = require('express-session')
const mainRoutes = require('./routes/main')
const dashboardRoutes = require('./routes/dashboard')
const connectDB = require('./config/database')
const methodOverride = require("method-override");

require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()
//ejs views
app.set("view engine", "ejs");

//body-parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//static file
app.use(express.static("public"));

//to overide put and get method

app.use(methodOverride("_method"));


app.use(session({
    secret: process.env.SECRET_TOKEN,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DB_URI}),
  }));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/', mainRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/dashboard/post', dashboardRoutes)
app.use('/dashboard/myPost', dashboardRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`i am running on port ${process.env.PORT} you can come in`)
})