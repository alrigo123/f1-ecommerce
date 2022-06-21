const express = require('express');
const viewController = require('../controllers/view.controller');

const route = express.Router();

//change
route.get('/', viewController.index);
route.get('/about', viewController.about)
route.get('/shop', viewController.shop)
route.get('/contact', viewController.contact)
route.get('/register', viewController.register)
route.get('/single-product/:id', viewController.singleProduct);	



// THIS IS THE STANDAR
route.get('/404',(req, res) =>{
    res.render('404',{head : ""});

})


module.exports = route;