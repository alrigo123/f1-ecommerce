const controller = {}
const connection = require('../config/connection');
const products_model = require('../models/products.model')
const functions = require('../middlewares/functions');
const model = require('../models/products.model');

controller.getCart = (req, res) => {
    var session_user = req.session.user
    var nick_user = functions.nickUser(session_user);
    //cart variables
    var session_cart = req.session.cart;
    var total = req.session.total;

    res.render('cart', { head: null, user: nick_user, cart: session_cart, total: total });
}

controller.addToCart = async (req, res) => {
    const id_product = req.body.id_product;
    const name = req.body.name;
    const price = req.body.price;
    const dsct_price = req.body.dsct_price;
    const quantity = req.body.quantity;
    const img = req.body.img;
    const product = {
        id_product: id_product,
        name: name,
        price: price,
        dsct_price: dsct_price,
        quantity: quantity,
        img: img
    }

    if (req.session.cart) {
        var session_cart = req.session.cart;
        if (!functions.isProductInCart(session_cart, id_product)) {
            session_cart.push(product);
        }
    } else {
        req.session.cart = [product];
        var session_cart = req.session.cart;
    }

    functions.calculateTotal(session_cart, req);
    res.redirect('/cart');
}

controller.removeFromCart = async (req, res) => {
}

module.exports = controller;