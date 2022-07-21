const express = require('express');
const route = express.Router();
const middleware_files= require('../middlewares/filesMulter');
const admin_controller = require('../controllers/adminProducts.controller');

route.get('/dashboard',admin_controller.dashboard);

route.get('/addProduct',admin_controller.viewAddProduct);
route.post('/addProduct',middleware_files.single("img"),admin_controller.addProduct);

route.get('/editProduct/:id_product',admin_controller.viewEditProduct);
route.post('/editProduct',admin_controller.editProduct);

route.get('/deleteProduct/:id_product',admin_controller.deleteProduct);


module.exports = route;