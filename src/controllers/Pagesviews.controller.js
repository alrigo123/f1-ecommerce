const connection = require('../config/connection');
const products_model = require('../models/products.model')
const functions = require('../middlewares/functions');
const controller = {}

controller.about = (req, res) => {
    res.render('about', { head: null });
}

controller.contact = (req, res) => {
    res.render('contact', { head: null });
}

controller.cart = (req, res) => {
    res.render('cart', { head: null });
}

controller.index = async (req, res) => {
    try {
        const pool = await connection
        const three_products = await products_model.getThreeRandomProducts(pool);
        const nick_user = '';
        var user_jwt = req.user

        if (user_jwt) {
            nick_user = await functions.getTwoLetters(user_jwt);
        } else {
            nick_user = null;
        }
        
        // console.log(three_products);
        res.render('index', { head: null, data: three_products, user: nick_user });
    } catch (error) {
        console.log(error.message);
    }
}

controller.shop = async (req, res) => {
    try {
        const pool = await connection
        const products_by_category = await products_model.getProductsOrderByCategory(pool);
        const categories = await products_model.getAllCategory(pool);
        res.render('shop', { head: null, data: products_by_category, categories });
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
        res.render('single-product', { head: null, data: single_product, order: three_products });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = controller;