const functions = {}

functions.getTwoLetters = (user) => {
    const str = user || '';
    return str.toUpperCase().substring(0, 2)
}

functions.nickUser = (session_user) => {
    if (session_user === undefined) {
        nick_user = null;
    } else {
        nick_user = functions.getTwoLetters(session_user);
    }
    return nick_user;
}

functions.isProductInCart = (session_cart, id_product) => {
    for (let i = 0; i < session_cart.length; i++) {
        if (session_cart[i].id_product === id_product) {
            return true;
        }
    }
    return false;
}

functions.calculateTotal = (session_cart, req) => {
    var total = 0;
    for (let i = 0; i < session_cart.length; i++) {
        if (session_cart[i].dsct_price) {
            total = total + (session_cart[i].dsct_price * session_cart[i].quantity);
        } else {
            total = total + (session_cart[i].price * session_cart[i].quantity);
        }
    }
    req.session.total = total;
    return total;
}

functions.deleteItemCartById = (id, session_cart) => {
    for (var i = 0; i < session_cart.length; i++) {
        if (session_cart[i].id_product == id) {
            session_cart.splice(i, 1);
        }
    }
    return session_cart
}

module.exports = functions