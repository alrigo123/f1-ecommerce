const cct = require('../config/connection');
const Products_Model = require('../models/product.models');
const controller = {}

controller.index = async (req, res) => {
    await Products_Model.GetProductsMain(cct, (err, products) => {
        if (err) throw `Error in the query ${err.message}`;
        res.render('index', { head: "HOME", data: products });
    })
}

controller.about = (req, res) => {
    res.render('about', { head: "ABOUT ME" });
}

controller.shop = async (req, res) => {
    await Products_Model.GetAllProducts(cct, async (err, products) => {
        if (err) throw `Error in the query ${err.message}`;

        await cct.query(`SELECT * FROM category`, (err, categories) => {
            if (err) throw `Error in the query ${err.message}`;

            res.render('shop', { head: "SHOP", data: products, order: categories });
        })
    });
}

controller.contact = (req, res) => {
    res.render('contact', { head: "CONTACT" });
}

controller.register = (req, res) => {
    res.render('register', { head: "REGISTER" });
}


controller.singleProduct = async (req, res) => {
    await Products_Model.GetProductsMain(cct, async (err, category) => {
        if (err) throw `Error in the query ${err.message}`;

        const { id } = req.params;

        await cct.query(`SELECT P.name as Pname,P.price,P.id_product,P.stock,P.img,P.description,C.id_category,C.name as Cname
        FROM product P
        INNER JOIN category C 
        ON P.id_category = C.id_category WHERE id_product = ?`, [id], (err, product) => {

            if (err) throw `Error in the query ${err.message}`;

            res.render('single-product', { head: "SINGLE PRODUCT", data: product, order: category })
        })
    })




    // agregar getporudct main para la parte final
    // res.render('single-product', { head: "SINGLE PRODUCT" });
}






module.exports = controller;