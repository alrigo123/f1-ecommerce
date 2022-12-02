const model = {}

model.insertProduct = async (pool, [product],img) => {
    const stmt = "INSERT INTO `product` (name, price, dsct_price, stock, img, description, id_category) VALUES (?, ? ,?, ?, ?, ?, ?)";
    const insert_product = pool.query(stmt, [product.name, product.price, product.dsct_price, product.stock, img, product.description, product.id_category]);
    const data = await insert_product;
    return data[0][0];
}

model.getAllProducts = async (pool) => {
    const query = `SELECT * FROM product ORDER BY name ASC`;
    const products = await pool.query(query);
    const data = products;
    return data[0];
}

model.deleteProduct = async (pool, id) => {
    const query = `DELETE FROM product WHERE id_product = ?`;
    const delete_product = pool.query(query, [id]);
    const data = await delete_product;
    return data[0];
}

model.updateProduct = async (pool, product, img) => {
    const stmt = "UPDATE `product` SET name = ?, price = ?, dsct_price = ?, stock = ?, img = ?, description = ?, id_category = ? WHERE id_product = ?";
    const edit_product = pool.query(stmt, [product.name, product.price, product.dsct_price, product.stock, img, product.description, product.id_category, product.id_product]);
    const data = await edit_product;
    return data[0];
}

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

model.getSingleProductandCategoryById = async (pool, id) => {
    const stmt = "SELECT P.name as Pname, P.price, P.dsct_price, P.id_product, P.stock, P.img, P.description, C.id_category, C.name as Cname FROM product P  INNER JOIN category C ON P.id_category = C.id_category WHERE id_product = ?";
    const single_product = pool.query(stmt, [id]);
    const data = await single_product;
    return data[0];
}

module.exports = model;