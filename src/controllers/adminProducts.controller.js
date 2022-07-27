const connection = require('../config/connection');
const functions = require('../middlewares/functions');
const product_model = require('../models/products.model');
const controller = {};

controller.dashboard = async (req, res) => {
    try {
        const pool = await connection

        const products_by_category = await product_model.getProductsOrderByCategory(pool);
        res.render('admin/dashboard', { head: null, data: products_by_category });
    } catch (error) {
        console.log(error)
    }
}

controller.viewAddProduct = async (req, res) => {
    try {
        const pool = await connection
        const category = await product_model.getAllCategory(pool);
        res.render('admin/addProduct', { head: null, data: category });
    } catch (error) {
        console.log(error)
    }
}

controller.addProduct = async (req, res) => {
    try {
        const pool = await connection;
        const product = req.body
        const img = req.file.filename;

        const product_added = await product_model.insertProduct(pool, [product], img);

        res.redirect('/dashboard');

        // throw new Error("Error");

        console.log('aqui se metio una bd xdxdxd??', product_added);

    } catch (error) {
        console.log(error)
    }
};

controller.viewEditProduct = async (req, res) => {
    try {
        const pool = await connection;
        const id_product = req.params.id_product;
        const single_product = await product_model.getSingleProductandCategoryById(pool, id_product);
        const category = await product_model.getAllCategory(pool)
        res.render('admin/editProduct', { head: null, data: single_product, categories: category });
    } catch (error) {
        console.log(error)
    }
}

controller.editProduct = async (req, res) => {
    try {
        const pool = await connection;
        const product = req.body;
        console.log(product, "....");
        const file = req.file.filename;
        await product_model.updateProduct(pool, product, file);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error)
    }
}

controller.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id_product;
        const pool = await connection
        await product_model.deleteProduct(pool, id);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error)
    }
}

module.exports = controller;