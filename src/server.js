const express = require('express');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

//Settings 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
  })


//Routes
const views_routes = require('./routes/views.routes');
const user_routes = require('./routes/user.routes');

app.use('/',views_routes)
app.use('/',user_routes)

//Database
const pool  = require('./config/connection');

//Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server on port', PORT);
});
