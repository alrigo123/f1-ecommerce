const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();


//Settings 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Route
app.use('/',"")


app.listen(process.env.PORT, () => {
    console.log('Server on port', process.env.PORT);
});
