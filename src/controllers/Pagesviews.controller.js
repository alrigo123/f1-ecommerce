const connection = require('../config/connection');
const products_model = require('../models/products.model')
const controller = {}

controller.index = async (req, res) => {
    try {
        const pool = await connection
        const three_products = await products_model.getThreeRandomProducts(pool);
        // console.log(three_products);
        res.render('index', { head: null, data: three_products });
    } catch (error) {
        console.log(error.message);
    }
}

controller.about = (req, res) => {
    res.render('about', { head: null });
}

controller.shop = async (req, res) => {
    res.render('shop', { head: null });
}

controller.contact = (req, res) => {
    res.render('contact', { head: null });

}

controller.register = (req, res) => {
    res.render('register', { head: null });

}


controller.singleProduct = async (req, res) => {

    // agregar getporudct main para la parte final
    // res.render('single-product', { head: "SINGLE PRODUCT" });
}






module.exports = controller;