const controller = {}
const functions = require('../middlewares/functions');

controller.getCart = (req, res) => {
    var session_user = req.session.user
    var nick_user = functions.nickUser(session_user);
    //cart variables
    var session_cart = req.session.cart;
    var total = req.session.total;
    let length_cart = 0

    if (session_cart === undefined) {
        session_cart = []
        total = 0;
        length_cart = 0;
    } else {
        for (var i = 0; i < session_cart.length; i++) {
            // console.log(i + ": " + session_cart[i].name);
            length_cart++;
            // console.log(length_cart);
        }
    }
    res.render('cart', { head: null, user: nick_user, cart: session_cart, total: total, length_cart });
}

controller.addToCart = async (req, res) => {
    const id_product = req.body.id_product;

    const product_added = req.body //contain id_product,name,price,dsct_price,quantity,img

    if (req.session.cart) {
        var session_cart = req.session.cart;
        if (!functions.isProductInCart(session_cart, id_product)) {
            session_cart.push(product_added);
        }
    } else {
        req.session.cart = [product_added];
        var session_cart = req.session.cart;
    }

    functions.calculateTotal(session_cart, req);
    res.redirect('/cart');
}

controller.removeFromCart = async (req, res) => {
    const id_product_to_delete = req.params.id_product;
    const session_cart = req.session.cart;

    functions.deleteItemCartById(id_product_to_delete,session_cart)
    functions.calculateTotal(session_cart, req);
    
    res.redirect('/cart');
} 

module.exports = controller;