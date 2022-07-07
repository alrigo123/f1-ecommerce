const express = require('express');
const views_controller = require('../controllers/Pagesviews.controller');

const route = express.Router();

//change
route.get('/', views_controller.index);
route.get('/about', views_controller.about)
route.get('/shop', views_controller.shop)
route.get('/contact', views_controller.contact)
route.get('/register', views_controller.register)
route.get('/single-product/:id', views_controller.singleProduct);	



// THIS IS THE STANDAR
route.get('/404',(req, res) =>{
    res.render('404',{head : ""});

})


module.exports = route;