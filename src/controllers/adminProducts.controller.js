const connection = require('../config/connection');
const functions = require('../middlewares/functions');
const product_model = require('../models/products.model');
const controller = {};

//WORK WITH SESSIONS

//Working without issues, pass data of user logged
controller.dashboard = async (req, res) => {
    try {
        const pool = await connection
        const products_by_category = await product_model.getAllProducts(pool);
        res.render('admin/dashboard', { head: null, data: products_by_category });
    } catch (error) {
        console.log(error)
    }
}
 
//Working without issues
controller.viewAddProduct = async (req, res) => {
    try {
        const pool = await connection
        const category = await product_model.getAllCategory(pool);
        res.render('admin/addProduct', { head: null, data: category });
    } catch (error) {
        console.log("View Add error: ", error)
    } 
}

//Working but
controller.addProduct = async (req, res) => {
    try {
        //Show image inside of the view when is selected
        const pool = await connection;
        const product = req.body
        const img = req.file.filename;
        const null_value = null;

        if (product.stock == '') product.stock = 0;
        if (product.dsct_price == '') product.dsct_price = null_value;
        // console.log(product);

        const product_added = await product_model.insertProduct(pool, [product], img);
        res.redirect('/dashboard');
    } catch (error) {
        console.log("Add product error: ", error)
    }
};

//Working without issues, null value
controller.viewEditProduct = async (req, res) => {
    try {
        const pool = await connection;
        const id_product = req.params.id_product;
        const single_product = await product_model.getSingleProductandCategoryById(pool, id_product);
        const category = await product_model.getAllCategory(pool)
        console.log(single_product);
        res.render('admin/editProduct', { head: null, data: single_product, categories: category });
    } catch (error) {
        console.log(error)
    }
}

//Read and put the file that's default
controller.editProduct = async (req, res) => {
    try {
        const pool = await connection;
        const product = req.body;
        // console.log(product, "....");
        const file = req.file.filename;
        
        await product_model.updateProduct(pool, product, file);

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error)
    } 
}

//Working without issues
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