const express = require('express');
const cart_controller = require('../controllers/cart.controller');
const route = express.Router();

route.get('/cart',cart_controller.getCart)
route.post('/add_to_cart',cart_controller.addToCart);
route.post('/remove_from_cart',cart_controller.removeFromCart);

module.exports = route;