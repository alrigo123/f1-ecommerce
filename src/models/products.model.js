const model = {}

model.getThreeRandomProducts = async (pool) => {
    const stmt = "SELECT * FROM `product` ORDER BY RAND() LIMIT 3";
    const products_order_by_category_query = pool.query(stmt);
    const data_order_by_category = await products_order_by_category_query;
    return data_order_by_category[0]
}

module.exports = model;