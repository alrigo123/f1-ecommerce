const model = {}

model.getThreeRandomProducts = async (pool) => {
    const stmt = "SELECT * FROM `product` ORDER BY RAND() LIMIT 3";
    const three_products = pool.query(stmt);
    const data = await three_products;
    return data[0]
}

model.getAllCategory = async (pool) => {
    const stmt = "SELECT * FROM `category`";
    const categories = pool.query(stmt);
    const data = await categories;
    return data[0]
}

model.getProductsOrderByCategory = async (pool) => {
    const stmt = 'SELECT * FROM `product` ORDER BY id_category ASC';
    const products = pool.query(stmt);
    const data = await products;
    return data[0];
}

model.getSingleProductById = async (pool,id) => {
    const stmt = "SELECT P.name as Pname, P.price, P.id_product, P.stock, P.img, P.description, C.id_category, C.name as Cname FROM product P  INNER JOIN category C ON P.id_category = C.id_category WHERE id_product = ?";
    const single_product = pool.query(stmt,[id]);
    const data = await single_product;
    return data[0];         
}

module.exports = model;