const connection = require('../config/connection');
const products_model = require('../models/products.model')
const functions = require('../middlewares/functions');
const controller = {}

controller.about = (req, res) => {
    var session_user = req.session.user
    var nick_user = functions.nickUser(session_user);
    res.render('about', { head: null, user: nick_user });
}

controller.contact = (req, res) => {
    var session_user = req.session.user
    var nick_user = functions.nickUser(session_user);
    res.render('contact', { head: null, user: nick_user });
}

controller.cart = (req, res) => {
    var session_user = req.session.user
    var nick_user = functions.nickUser(session_user);
    res.render('cart', { head: null, user: nick_user });
}

controller.index = async (req, res) => {
    try {
        const pool = await connection
        const three_products = await products_model.getThreeRandomProducts(pool);

        var session_user = req.session.user
        var nick_user = functions.nickUser(session_user);

        res.render('index', { head: null, data: three_products, user: nick_user });
    } catch (error) {
        console.log(error);
    }
}

controller.shop = async (req, res) => {
    try {
        const pool = await connection
        const products_by_category = await products_model.getProductsOrderByCategory(pool);
        const categories = await products_model.getAllCategory(pool);

        var session_user = req.session.user
        var nick_user = functions.nickUser(session_user);

        res.render('shop', { head: null, data: products_by_category, categories, user: nick_user });
    } catch (error) {
        console.log(error.message);
    }
}

controller.singleProduct = async (req, res) => {
    // agregar getporudct main para la parte final
    const id = req.params.id_product;
    try {
        const pool = await connection
        const single_product = await products_model.getSingleProductById(pool, id);
        const three_products = await products_model.getThreeRandomProducts(pool);
        // console.log(id);

        var session_user = req.session.user
        var nick_user = functions.nickUser(session_user);

        res.render('single-product', { head: null, data: single_product, order: three_products, user: nick_user });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = controller;