const express = require('express');
const views_controller = require('../controllers/pagesViews.controller');
const middleware = require('../middlewares/isLogged');
const route = express.Router();

//change
// route.get('/', user_controller.isAuthenticated//middleware.isLogged, views_controller.index);
route.get('/', views_controller.index);
route.get('/about', views_controller.about)
route.get('/shop', views_controller.shop)
route.get('/contact', views_controller.contact)
route.get('/single-product/:id_product', views_controller.singleProduct);

// THIS IS THE STANDAR
route.get('/404', (req, res) => {
    res.render('404', { head: "" });

})


module.exports = route;